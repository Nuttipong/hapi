import { CirCuitBreaker } from "../common/circuitBreaker";

export class GitHubApi {
  constructor() {
    if (this.constructor["instance"]) {
      return this.constructor["instance"];
    }

    this.defaultHeaders = {
      Accept: "application/vnd.github.v3+json",
    };

    this.GITHUB_URL = new URL("https://api.github.com/search/repositories");
    this.circuitBreaker = new CirCuitBreaker();
    this.constructor["instance"] = this;
  }

  async get(queries, options) {
    const request = this.buildRequest(this.GITHUB_URL, "GET", queries, options);
    const resp = await this.circuitBreaker.execute(request);
    return resp;
  }

  buildRequest(url, method, queries, options, payload) {
    const headers = Object.assign(this.defaultHeaders, options);
    const request = {
      method: method,
      url: this.buildUrl(url, queries),
      headers: headers,
    };

    if (payload) {
      request = {
        ...request,
        payload,
      };
    }

    return request;
  }

  buildUrl(url, queries) {
    const params = new URLSearchParams(url.search);
    for (const [key, value] of queries) {
      params.append(key, value);
    }
    return `${url.href}?${params.toString()}`;
  }
}
