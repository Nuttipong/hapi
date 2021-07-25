import HapiSwagger from "hapi-swagger";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Handlebars from "handlebars";
import Path from "path";
const viewsPath = Path.resolve(__dirname);

export const configPlugin = () => {
  return [
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "API Documentation",
          version: "1.0.0",
        },
      },
      jsonEditor: true,
    },
  ];
};

export const configView = () => {
  return {
    engines: {
      html: Handlebars,
    },
    path: Path.resolve(viewsPath, "../../templates"),
    helpersPath: Path.resolve(viewsPath, "../../templates/helpers"),
    partialsPath: Path.resolve(viewsPath, "../../templates/partials"),
  };
};
