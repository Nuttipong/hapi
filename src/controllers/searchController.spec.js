import { server as Server } from "../server";
import { GetRepositoryListQuery } from "../services/search/queries/getRepositoryListQuery";
import { Logger } from "../common/logger";
import { GitHubApi } from "../api/github";

jest.mock("../common/logger");

describe("SearchController handler", () => {
  beforeEach((done) => {
    Server.events.on("start", () => {
      done();
    });
  });

  afterEach((done) => {
    Server.events.on("stop", () => {
      done();
    });
    Server.stop();
  });

  it(`should success with connection`, async () => {
    // givenn
    const options = {
      method: "GET",
      url: "/search",
    };
    const vm = { foo: "bar" };
    const logger = new Logger();
    spyOn(logger, "log");
    const repo = new GetRepositoryListQuery(logger, new GitHubApi());
    spyOn(repo, "execute").and.returnValue(vm);

    // when
    const data = await Server.inject(options);

    // then
    expect(data.statusCode).toBe(200);
    // and
    expect(data.result).toBeDefined();
  });
});
