import { GitHubApi } from "../infrastructure/githubApi";

export class SearchService {
  constructor(logger) {
    if (this.constructor["instance"]) {
      return this.constructor["instance"];
    }

    this.logger = logger;
    this.githubApi = new GitHubApi();
    this.constructor["instance"] = this;
  }

  async fetch(dto) {
    const query = new Map();
    for (const key in dto) {
      if (key !== "range") {
        query.set(key, dto[key]);
      }
    }
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
    };
    let results = {};
    try {
      const searchUrl = new URL("http://localhost:3000/search");
      const resp = await this.githubApi.get(query, headers);
      if (resp && resp.items) {
        const totalCount = resp.total_count > 1000 ? 1000 : resp.total_count;
        const q = dto.q;
        const page = parseInt(dto.page);
        const limit = parseInt(dto.per_page);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const range = parseInt(dto.range);
        const lastPage = Math.ceil(totalCount / limit);

        if (endIndex < totalCount) {
          results.next = {
            page: page + 1,
            per_page: limit,
            url: this.buildUrlWithQuery(searchUrl, page + 1, limit, q, range),
          };
        }

        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
            per_page: limit,
            url: this.buildUrlWithQuery(searchUrl, page - 1, limit, q, range),
          };
        }

        if (page !== 1) {
          results.first = {
            page: 1,
            per_page: limit,
            url: this.buildUrlWithQuery(searchUrl, 1, limit, q, range),
          };
        }

        if (page !== lastPage) {
          results.last = {
            page: lastPage,
            per_page: limit,
            url: this.buildUrlWithQuery(searchUrl, lastPage, limit, q, range),
          };
        }

        results.items = resp.items;
        results.ranges = this.getPageRange(
          searchUrl,
          limit,
          page,
          lastPage,
          range,
          q
        );
        results.total_count = totalCount;
      }
    } catch (err) {
      this.logger.error(`Fetch api error : ${err}`);
    } finally {
      return results;
    }
  }

  buildUrlWithQuery(searchUrl, page, per_page, q, range) {
    const params = new URLSearchParams(searchUrl.search);
    params.append("q", q);
    params.append("page", page);
    params.append("per_page", per_page);
    params.append("range", range);
    return `${searchUrl.href}?${params.toString()}`;
  }

  getPageRange(searchUrl, limit, page, pages, window, q) {
    let maxLeft = page - Math.floor(window / 2);
    let maxRight = page + Math.floor(window / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = window;
    }

    if (maxRight >= pages) {
      maxLeft = pages - (window - 1);
      maxRight = pages;

      if (maxLeft < 1) {
        maxLeft = 1;
      }
    }

    const ranges = [];
    for (let page = maxLeft; page <= maxRight; page++) {
      ranges.push({
        page,
        pageUrl: this.buildUrlWithQuery(searchUrl, page, limit, q, window),
      });
    }
    return ranges;
  }
}
