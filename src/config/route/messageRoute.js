import { MessageController } from "../../controllers/messageController";

const ctrl = new MessageController();

export default [
  {
    method: "POST",
    path: "/api/messages",
    options: {
      description: "Message Handler",
      notes: "Returns convertion object",
      tags: ["api"],
      handler: ctrl.messageHandler,
    },
  },
];
