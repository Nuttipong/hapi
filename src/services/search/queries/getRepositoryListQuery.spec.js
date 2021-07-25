import {
  GetRepositoryListQuery,
  IGetRepositoryListQuery,
} from "./getRepositoryListQuery";
import { Logger } from "../../../common/logger";
import { GitHubApi } from "../../../api/github";

describe("GetRepositoryListQuery class", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("should execute with dto properly", async () => {
    // given
    const logger = new Logger();
    const api = new GitHubApi();
    const instance = new GetRepositoryListQuery(logger, api);
    const dto = {
      q: "foo",
      page: 5,
      per_page: 10,
      range: 10,
    };
    const expectedResponse = {
      total_count: 1000,
      items: new Array(dto.range).fill({
        id: 6409352,
        node_id: "MDEwOlJlcG9zaXRvcnk2NDA5MzUy",
        name: "NodeJS-SDK",
        full_name: "wepay/NodeJS-SDK",
        private: false,
      }),
    };
    const expectedQuery = new Map();
    for (const key in dto) {
      expectedQuery.set(key, dto[key]);
    }
    const expectedHeaders = {
      "Content-Type": "application/json;charset=utf-8",
    };
    spyOn(api, "get").and.returnValue(expectedResponse);

    // when
    const resp = await instance.execute(dto);

    // then
    expect(api.get).toHaveBeenCalledWith(expectedQuery, expectedHeaders);
    // and
    expect(resp.items).toEqual(expectedResponse.items);
    // and
    expect(resp.total_count).toEqual(expectedResponse.total_count);
    // and
    expect(resp.pagination).toBeDefined();
    expect(resp.pagination.first).toBeDefined();
    expect(resp.pagination.last).toBeDefined();
    expect(resp.pagination.next).toBeDefined();
    expect(resp.pagination.prev).toBeDefined();
    expect(resp.pagination.ranges).toBeDefined();
  });

  it("should be singleton", () => {
    // given
    const logger = new Logger();
    const api = new GitHubApi();

    // when
    const instanceA = new GetRepositoryListQuery(logger, api);
    const instanceB = new GetRepositoryListQuery(logger, api);

    // then
    expect(instanceA).toBe(instanceB);
  });

  it("should be cope with exception", async () => {
    // given
    const fakeError = new Error("Fake error!");
    const logger = new Logger();
    const api = new GitHubApi();
    api.get = jest.fn().mockImplementationOnce(() => Promise.reject(fakeError));
    spyOn(logger, "error");

    const instance = new GetRepositoryListQuery(logger, api);
    const expectedErrorCalledWith = `Fetch api error : ${fakeError}`;

    // when
    const resp = await instance.execute({});

    // then
    expect(resp).toEqual({});
    // and
    expect(logger.error).toHaveBeenCalledWith(expectedErrorCalledWith);
    // and
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it("should be extend IGetRepositoryListQuery as abstract", () => {
    // given
    const result =
      GetRepositoryListQuery.prototype instanceof IGetRepositoryListQuery;

    // then
    expect(result).toBeTruthy();
  });

  it("should be not new IGetRepositoryListQuery", () => {
    // given
    let result;

    // when
    try {
      result = new IGetRepositoryListQuery();
    } catch (err) {
      // then
      expect(result).toBeUndefined();
      //and
      expect(err.message).toEqual("IGetRepositoryListQuery is abstract");
    }
  });
});
