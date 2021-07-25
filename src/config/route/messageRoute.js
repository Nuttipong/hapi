import { MessageController } from "../../controllers/messageController";

const ctrl = new MessageController();

export default [
  {
    method: "POST",
    path: "/api/messages",
    options: {
      description: "API to convert JSON payload to specific formatted",
      notes: "Return specific JSON formatted object",
      tags: ["api"],
      handler: ctrl.messageHandler,
    },
  },
];
