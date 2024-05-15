import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import { orderRoutes } from "./orderRoute";

const routes: RouteObject[] = [...orderRoutes];

const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
