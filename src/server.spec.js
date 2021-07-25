import Hapi from "@hapi/hapi";
import searchRoutes from "./config/route/searchRoute";
import messageRoutes from "./config/route/messageRoute";

describe("Server Route API Handler", () => {
  let server;

  beforeEach(() => {
    server = new Hapi.Server();
  });

  afterEach(() => {
    server.stop();
  });

  it("should success with message route", async () => {
    // given
    const request = {
      method: "POST",
      url: "/api/messages",
      payload: {},
    };
    const route = {
      ...messageRoutes[0],
      options: {
        ...messageRoutes[0].options,
        handler: jest.fn().mockReturnValue({}),
      },
    };
    server.route(route);

    // when
    const data = await server.inject(request);

    // then
    expect(data.statusCode).toBe(200);
  });
});

describe("Server Route Web Handler", () => {
  let server;

  beforeEach(() => {
    server = new Hapi.Server();
  });

  afterEach(() => {
    server.stop();
  });

  it("should success with search route", async () => {
    // given
    const options = {
      method: "GET",
      url: "/search?q=nodejs&page=1&per_page=10&range=10",
    };
    const route = {
      ...searchRoutes[0],
      handler: jest.fn().mockReturnValue({}),
    };
    server.route(route);

    // when
    const data = await server.inject(options);

    // then
    expect(data.statusCode).toBe(200);
  });
});
