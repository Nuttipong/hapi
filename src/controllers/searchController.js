export class SearchController {
  constructor(factory, sanitize) {
    this.factory = factory;
    this.sanitize = sanitize;
  }

  searchHandler = async (req, h) => {
    const dto = {
      q: this.sanitize.clean(req.query.q) || "nodejs",
      per_page: this.sanitize.clean(req.query.per_page) || 10,
      page: this.sanitize.clean(req.query.page) || 1,
      range: this.sanitize.clean(req.query.range) || 10,
    };

    const vm = await this.factory.create(dto);
    return h.view("search", { vm });
  };
}
