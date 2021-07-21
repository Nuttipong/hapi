import { SearchController } from "../controllers/searchController";
import { SearchService } from "../services/searchService";
import { Logger } from "../common/logger";

const ctx = {
  searchService: new SearchService(new Logger()),
};
const ctrl = new SearchController(ctx);

export default [
  {
    method: "GET",
    path: "/search",
    handler: ctrl.searchHandler,
  },
];
