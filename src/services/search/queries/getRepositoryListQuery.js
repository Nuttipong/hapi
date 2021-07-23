import { Paging, PageButton } from "../../../common/paging";

export class IGetRepositoryListQuery {
  constructor() {
    if (this.constructor.name === "IGetRepositoryListQuery") {
      throw new Error("IGetRepositoryListQuery is abstract");
    }
  }

  execute(dto) {}
}

export class GetRepositoryListQuery extends IGetRepositoryListQuery {
  constructor(logger, githubApi) {
    super();
    if (this.constructor["instance"]) {
      return this.constructor["instance"];
    }

    this.logger = logger;
    this.githubApi = githubApi;
    this.searchUrl = new URL("http://localhost:3000/search");
    this.constructor["instance"] = this;
  }

  async execute(dto) {
    let results = {};
    try {
      const query = new Map();
      for (const key in dto) {
        query.set(key, dto[key]);
      }
      const headers = {
        "Content-Type": "application/json;charset=utf-8",
      };

      const resp = await this.githubApi.get(query, headers);
      // Github support only 1000 items
      const totalCount = resp.total_count > 1000 ? 1000 : resp.total_count;
      if (resp && resp.items) {
        results.items = resp.items;
        results.total_count = totalCount;
        results.pagination = this.setPaging(
          totalCount,
          parseInt(dto.page),
          parseInt(dto.per_page),
          parseInt(dto.range),
          dto.q
        );
      }
    } catch (err) {
      this.logger.error(`Fetch api error : ${err}`);
    } finally {
      return results;
    }
  }

  setPaging(totalCount, page, per_page, range, q) {
    const paging = new Paging(totalCount, page, per_page, range);
    return {
      ranges: paging.setRange().setUrl(PageButton.RANGE, (p) => {
        return this.buildUrlWithQuery(this.searchUrl, p, per_page, q, range);
      }).rangeBtn,
      next: paging.setNext().setUrl(PageButton.NEXT, (p) => {
        return this.buildUrlWithQuery(this.searchUrl, p, per_page, q, range);
      }).nextBtn,
      prev: paging.setPrev().setUrl(PageButton.PREV, (p) => {
        return this.buildUrlWithQuery(this.searchUrl, p, per_page, q, range);
      }).prevBtn,
      first: paging.setFirst().setUrl(PageButton.FISRT, (p) => {
        return this.buildUrlWithQuery(this.searchUrl, p, per_page, q, range);
      }).firstBtn,
      last: paging.setLast().setUrl(PageButton.LAST, (p) => {
        return this.buildUrlWithQuery(this.searchUrl, p, per_page, q, range);
      }).lastBtn,
    };
  }

  buildUrlWithQuery(searchUrl, page, per_page, q, range) {
    const params = new URLSearchParams(searchUrl.search);
    params.append("q", q);
    params.append("page", page);
    params.append("per_page", per_page);
    params.append("range", range);
    return `${searchUrl.href}?${params.toString()}`;
  }
}
