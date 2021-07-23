import messageRoutes from "./messageRoute";
import searchRoutes from "./searchRoute";

export const createRoutes = () =>
  [].concat(
    [
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
