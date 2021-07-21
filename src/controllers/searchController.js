export class SearchController {
  constructor(ctx) {
    this.searchService = ctx.searchService;
  }

  searchHandler = async (req, h) => {
    const dto = {
      q: req.query.q || "nodejs",
      per_page: req.query.per_page || 10,
      page: req.query.page || 1,
      range: req.query.range || 10,
    };

    const { total_count, items, next, prev, ranges, last, first } =
      await this.searchService.fetch(dto);
    const vm = {
      total_count: total_count || 0,
      items: items || [],
      next,
      prev,
      ranges: ranges || [],
      last,
      first,
      ...dto,
    };
    return h.view("search", { vm });
  };
}
