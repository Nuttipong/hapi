import {
  CreateRepositoryViewModelFactory,
  ICreateRepositoryViewModelFactory,
} from "./createRepositoryViewModelFactory";
import { GetRepositoryListQuery } from "./../../services/search/queries/getRepositoryListQuery";

describe("CreateRepositoryViewModelFactory component", () => {
  it("should create view model properly", async () => {
    // given
    const tuple = [
      [
        {
          q: "nodejs",
          per_page: 10,
          page: 1,
          range: 10,
        },
        {
          total_count: 1000,
          items: new Array(5).fill("data"),
          pagination: {},
          q: "nodejs",
          per_page: 10,
          page: 1,
          range: 10,
        },
      ],
    ];
    const repoListQuery = new GetRepositoryListQuery(null, null);

    for (const row of tuple) {
      const [dto, expected] = row;
      const factory = new CreateRepositoryViewModelFactory(repoListQuery);
      spyOn(repoListQuery, "execute").and.returnValue(expected);

      // when
      const actual = await factory.create(dto);

      // then
      expect(actual).toEqual(expected);
      // and
      expect(repoListQuery.execute).toHaveBeenCalledWith(dto);
    }
  });

  it("should be extend ICreateRepositoryViewModelFactory", () => {
    // given
    const result =
      CreateRepositoryViewModelFactory.prototype instanceof
      ICreateRepositoryViewModelFactory;

    // then
    expect(result).toBeTruthy();
  });

  it("should be not new ICreateRepositoryViewModelFactory", () => {
    // given
    let result;

    // when
    try {
      result = new ICreateRepositoryViewModelFactory();
    } catch (err) {
      // then
      expect(result).toBeUndefined();
      //and
      expect(err.message).toEqual(
        "ICreateRepositoryViewModelFactory is abstract"
      );
    }
  });
});
