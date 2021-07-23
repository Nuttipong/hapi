import Joi from "joi";
import { MessageController } from "../../controllers/messageController";

const ctrl = new MessageController();

// const model = Joi.object({
//   id: Joi.number().required().example(10),
//   title: Joi.string().required().example("House"),
//   level: Joi.number().required().example(1),
//   children: Joi.string().valid([]),
//   parent_id: Joi.number().example(null),
// });

// const listModel = Joi.object({
//   payload: Joi.array().items(model),
// })
//   .label("Response Payload")
//   .description("Json body formatted");

// const errorModel = Joi.object({
//   code: Joi.number(),
//   msg: Joi.string(),
// }).label("Error");

// const httpStatus = {
//   200: {
//     description: "Success",
//     schema: listModel,
//   },
//   400: {
//     description: "Bad Request",
//     schema: errorModel,
//   },
//   500: {
//     description: "Internal Server Error",
//     schema: errorModel,
//   },
// };

export default [
  {
    method: "POST",
    path: "/api/messages",
    options: {
      description: "API to convert JSON payload to specific formatted",
      notes: "Return specific JSON formatted object",
      tags: ["api"],
      handler: ctrl.messageHandler,
      plugins: {
        "hapi-swagger": {
          // responses: httpStatus,
          payloadType: "form",
          produces: ["application/json"],
          consumes: ["application/json"],
        },
      },
    },
  },
];
