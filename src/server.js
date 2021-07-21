import "@babel/polyfill";
import Hapi from "@hapi/hapi";
import { configPlugin, configView } from "./config/dependency/index";
import Routes from "./config/route";
import { Logger } from "./common/logger";

const logger = new Logger();

export const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

server.ext("onRequest", (req, res) => {
  logger.log(`Request received ${req.path}`);
  return res.continue;
});

server.ext("onPreResponse", (req, res) => {
  if (req.response.isBoom) {
    logger.log(`Response error ${req.response}`);
  }
  return res.continue;
});

(async () => {
  try {
    await server.register(configPlugin());
    server.route(Routes);
    server.views(configView());

    await server.start();

    logger.info(`Server running on ${server.info.uri}`);
  } catch (err) {
    logger.error(err);
  }
})();
