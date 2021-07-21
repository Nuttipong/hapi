import fetch from "node-fetch";

export class GitHubApi {
  GITHUB_URL = new URL("https://api.github.com/search/repositories");

  constructor() {
    if (this.constructor["instance"]) {
      return this.constructor["instance"];
    }

    this.defaultHeaders = {
      Accept: "application/vnd.github.v3+json",
    };
    this.constructor["instance"] = this;
  }

  async get(queries, options) {
    const headers = Object.assign(this.defaultHeaders, options);
    const params = new URLSearchParams(this.GITHUB_URL.search);
    for (const [key, value] of queries) {
      params.append(key, value);
    }
    const url = `${this.GITHUB_URL.href}?${params.toString()}`;
    return await new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers,
      })
        .then((resp) => resp.json())
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(`Call GitHub Api error: ${err}`);
          reject(err);
        });
    });
  }
}
