import { server as Server } from "./server";

describe("Server route handler", () => {
  beforeEach(() => {
    Server.events.on("start", () => {
      done();
    });
  });

  afterAll(() => {
    Server.events.on("stop", () => {
      done();
    });
    Server.stop();
  });

  test("should success with server connection", async () => {
    // given
    const options = {
      method: "GET",
      url: "/",
    };

    // when
    const data = await Server.inject(options);

    // then
    expect(data.statusCode).toBe(200);
  });
});
