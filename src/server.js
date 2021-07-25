import "@babel/polyfill";
import Hapi from "@hapi/hapi";
import { configPlugin, configView } from "./config/dependency";
import { createRoutes } from "./config/route";
import { Logger } from "./common/logger";

export const logger = new Logger();

export const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

server.ext("onRequest", (req, res) => {
  logger.log(`Request received ${req.path}`);
  return res.continue;
});

(async () => {
  await server.register(configPlugin());

  server.route(createRoutes());
  server.views(configView());

  await server.start();

  logger.info(`Server running on ${server.info.uri}`);
})();
