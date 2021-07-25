import { CirCuitBreaker, BreakerState } from "./circuitBreaker";
import axios from "axios";

jest.mock("axios");

describe("CircuitBreaker component", () => {
  describe(`should handle ${BreakerState.GREEN} state`, () => {
    let circuitBreaker;
    const mockRequest = {
      method: "GET",
      url: "https://fakeapi.com/",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/vnd.github.v3+json",
      },
    };

    beforeEach(() => {
      circuitBreaker = new CirCuitBreaker(null);
    });

    it(`with successCount less than successThreshold`, async () => {
      // given
      circuitBreaker = new CirCuitBreaker(null);
      axios.mockResolvedValue({ status: 200, data: {} });
      spyOn(circuitBreaker.logger, "table");

      // when
      const resp = await circuitBreaker.execute(mockRequest);

      // then
      expect(resp).toBeDefined();
      // and
      expect(circuitBreaker.logger.table).toHaveBeenCalledTimes(1);
      // and
      expect(circuitBreaker.state).toEqual(BreakerState.GREEN);
    });

    it(`with successCount greater than successThreshold`, async () => {
      // given
      circuitBreaker.state = BreakerState.RED;
      circuitBreaker.timeout = Date.now();
      spyOn(circuitBreaker.logger, "table");

      let resp;
      for (let call of [200, 200, 200, 200]) {
        axios.mockResolvedValue({ status: call, data: {} });
        // when
        try {
          resp = await circuitBreaker.execute(mockRequest);
        } catch (_) {}

        // then
        if (!resp) {
          expect(circuitBreaker.state).toEqual(BreakerState.YELLOW);
        }
      }

      // and
      expect(resp).toBeDefined();
      // and
      expect(circuitBreaker.state).toEqual(BreakerState.GREEN);
    });
  });

  describe(`should handle ${BreakerState.RED} state`, () => {
    let circuitBreaker;
    const mockRequest = {
      method: "GET",
      url: "https://fakeapi.com/",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/vnd.github.v3+json",
      },
    };

    beforeEach(() => {
      circuitBreaker = new CirCuitBreaker(null);
      circuitBreaker.timeout = Date.now();
    });

    it(`with failureCount greater than or equal failureThreshold`, async () => {
      // given
      circuitBreaker.timeout = 10;
      spyOn(circuitBreaker.logger, "table");

      let resp;
      const lastCall = 2;
      for (let call of [400, 400, 400]) {
        axios.mockResolvedValue({ status: call, data: {} });
        // when
        try {
          resp = await circuitBreaker.execute(mockRequest);
        } catch (_) {
          if (lastCall !== 2) {
            expect(circuitBreaker.state).toEqual(BreakerState.GREEN);
          }
        }
      }

      // then
      expect(resp).toBeDefined();
      // and
      expect(circuitBreaker.state).toEqual(BreakerState.RED);
    });
  });

  describe(`should handle failure network`, () => {
    let circuitBreaker;
    const mockRequest = {
      method: "GET",
      url: "https://fakeapi.com/",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/vnd.github.v3+json",
      },
    };

    beforeEach(() => {
      circuitBreaker = new CirCuitBreaker({
        successThreshold: 3,
        failureThreshold: 3,
        timeout: 10,
      });
    });

    it(`with failureCount greater than or equal failureThreshold`, async () => {
      // given
      spyOn(circuitBreaker.logger, "table");
      spyOn(circuitBreaker.logger, "log");

      let resp;
      const lastCall = 2;
      for (let call of [400, 400, 400]) {
        axios.mockImplementationOnce(() =>
          Promise.reject(new Error("Fake error!"))
        );

        try {
          // when
          resp = await circuitBreaker.execute(mockRequest);
        } catch (_) {
          if (lastCall !== 2) {
            expect(circuitBreaker.state).toEqual(BreakerState.GREEN);
          }
        }
      }

      // then
      expect(resp).toBeDefined();
      // and
      expect(circuitBreaker.state).toEqual(BreakerState.RED);
    });
  });

  describe(`should handle ${BreakerState.YELLOW} state`, () => {
    const mockRequest = {
      method: "GET",
      url: "https://fakeapi.com/",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/vnd.github.v3+json",
      },
    };

    it(`with circuit suspended when next attempt less than current date`, async () => {
      // given
      const circuitBreaker = new CirCuitBreaker({
        successThreshold: 1,
        failureThreshold: 2,
        timeout: 100,
      });
      spyOn(circuitBreaker.logger, "table");
      circuitBreaker.state = BreakerState.RED;

      let resp;
      for (let call of [200, 200, 200]) {
        axios.mockResolvedValue({ status: call, data: {} });

        try {
          // when
          resp = await circuitBreaker.execute(mockRequest);
        } catch (err) {
          // then
          expect(resp).toBeUndefined();
          // and
          expect(err.message).toEqual("Circuit suspended!");
        }
      }
    });

    it(`should handle error`, async () => {
      // given
      const circuitBreaker = new CirCuitBreaker({
        successThreshold: 1,
        failureThreshold: 2,
        timeout: 100,
      });

      circuitBreaker.state = BreakerState.RED;
      circuitBreaker.nextAttempt = Date.now() + 50;

      let resp;
      try {
        // when
        resp = await circuitBreaker.execute(mockRequest);
      } catch (err) {
        // then
        expect(resp).toBeUndefined();
        // and
        expect(err.message).toEqual("Circuit suspended!");
      }
    });
  });
});
