import messageRoutes from "./messageRoute";
import searchRoutes from "./searchRoute";

export default [].concat(
  [
    {
      method: "GET",
      path: "/",
      handler: (_, h) => {
        return h.view("index");
      },
    },
    {
      method: "GET",
      path: "/assets/{path*}",
      handler: {
        directory: {
          path: "./src/public",
          listing: false,
        },
      },
    },
  ],
  searchRoutes,
  messageRoutes
);
