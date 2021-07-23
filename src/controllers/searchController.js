export class SearchController {
  constructor(factory) {
    this.factory = factory;
  }

  searchHandler = async (req, h) => {
    const dto = {
      q: req.query.q || "nodejs",
      per_page: req.query.per_page || 10,
      page: req.query.page || 1,
      range: req.query.range || 10,
    };

    const vm = await this.factory.create(dto);
    return h.view("search", { vm });
  };
}
