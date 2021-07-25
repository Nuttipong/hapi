import Handlebars from "../helpers/index";
import HTML from "./paging.html";
import { GetRepositoryListQuery } from "../../services/search/queries/getRepositoryListQuery";

describe("Paging partial", () => {
  it("should always render with pagination model", () => {
    // given
    const tuple = [
      [100, 1, 10, 10, "nodejs"],
      [100, 11, 10, 10, "nodejs"],
    ];
    const svc = new GetRepositoryListQuery();
    const template = Handlebars.compile(HTML);

    for (const row of tuple) {
      const [total, page, limit, range, q] = row;
      const model = svc.setPaging(total, page, limit, range, q);
      const vm = {
        pagination: model,
        page,
        total_count: total,
        items: [],
      };

      // when
      const actual = template({ vm });

      // then
      expect(actual).toBeDefined();
      // and
      expect(actual).toMatchSnapshot();
    }
  });
});
