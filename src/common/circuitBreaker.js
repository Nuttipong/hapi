import axios from "axios";
import { Logger } from "./logger";

export const BreakerState = Object.freeze({
  RED: "RED",
  YELLOW: "YELLOW",
  GREEN: "GREEN",
});

export class CirCuitBreaker {
  constructor(options) {
    this.state = BreakerState.GREEN;
    this.logger = new Logger();

    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttempt = Date.now();

    if (options) {
      this.successThreshold = options.successThreshold;
      this.failureThreshold = options.failureThreshold;
      this.timeout = options.timeout;
    } else {
      this.successThreshold = 3;
      this.failureThreshold = 3;
      this.timeout = 3500;
    }
  }

  async execute(request) {
    if (BreakerState.RED === this.state) {
      if (this.nextAttempt <= Date.now()) {
        this.state = BreakerState.YELLOW;
      } else {
        throw new Error("Circuit suspended!");
      }
    }

    let resp;
    try {
      resp = await axios(request);
      if (resp.status === 200) {
        return this.success(resp.data);
      } else {
        return this.failure(resp.data);
      }
    } catch (err) {
      this.logger.log(`Http error ${err}`);
      return this.failure(err.message);
    }
  }

  success(resp) {
    this.failureCount = 0;

    if (BreakerState.YELLOW === this.state) {
      this.successCount += 1;

      if (this.successCount > this.successThreshold) {
        this.state = BreakerState.GREEN;
        this.successCount = 0;
      }
    }
    this.log("Success");
    return resp;
  }

  failure(resp) {
    this.successCount = 0;
    this.failureCount += 1;

    if (this.failureCount >= this.failureThreshold) {
      this.state = BreakerState.RED;
      this.nextAttempt = Date.now() + this.timeout;
    }
    this.log("Failure");
    return resp;
  }

  log(result) {
    this.logger.table({
      Result: result,
      Timestamp: Date.now(),
      Successes: this.successCount,
      Failures: this.failureCount,
      State: this.state,
    });
  }
}
