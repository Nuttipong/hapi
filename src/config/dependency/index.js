import HapiSwagger from "hapi-swagger";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Handlebars from "handlebars";

const configSwagger = () => {
  return [
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "API Documentation",
          version: "1.0.0",
        },
      },
    },
  ];
};

export const configPlugin = () => {
  return [Vision, Inert, configSwagger()];
};

export const configView = () => {
  return {
    engines: {
      html: Handlebars,
    },
    path: "./src/templates",
    helpersPath: "./src/templates/helpers",
  };
};
