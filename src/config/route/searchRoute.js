import { CreateRepositoryViewModelFactory } from "../../controllers/factory/createRepositoryViewModelFactory";
import { SearchController } from "../../controllers/searchController";
import { GetRepositoryListQuery } from "../../services/search/queries/getRepositoryListQuery";
import { Logger } from "../../common/logger";
import { GitHubApi } from "../../api/github";

const ctrl = new SearchController(
  new CreateRepositoryViewModelFactory(
    new GetRepositoryListQuery(new Logger(), new GitHubApi())
  )
);

export default [
  {
    method: "GET",
    path: "/search",
    handler: ctrl.searchHandler,
  },
];
