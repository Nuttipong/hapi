import { GitHubApi } from "./github";

describe("Github API", () => {
  let api;
  const queries = new Map([
    ["q", "nodejs"],
    ["page", "1"],
    ["per_page", "10"],
  ]);
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
  };

  beforeEach(() => {
    api = new GitHubApi();
  });

  afterEach(() => {
    api.defaultHeaders;
  });

  it("GET > should success call get", async () => {
    // given
    const expectedRequest = {
      method: "GET",
      url: "https://api.github.com/search/repositories?q=nodejs&page=1&per_page=10",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/vnd.github.v3+json",
      },
    };
    spyOn(api.circuitBreaker, "execute").and.returnValue({});

    // when
    const resp = await api.get(queries, headers);

    // then
    expect(resp).toBeDefined();
    // and
    expect(api.circuitBreaker.execute).toHaveBeenCalledTimes(1);
    expect(api.circuitBreaker.execute).toHaveBeenCalledWith(expectedRequest);
  });

  it("should be singleton with default values", async () => {
    // given
    let newApi;
    const url = new URL("https://api.github.com/search/repositories");
    const defaultHeaders = {
      Accept: "application/vnd.github.v3+json",
    };

    // when
    newApi = new GitHubApi();

    // then
    expect(api).toEqual(newApi);
    // and
    expect(newApi.GITHUB_URL.href).toBe(url.href);
    expect(newApi.defaultHeaders["Accept"]).toContain(defaultHeaders["Accept"]);
    expect(newApi.circuitBreaker).toBeDefined();
  });
});
