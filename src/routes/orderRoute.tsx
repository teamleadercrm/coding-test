import { Navigate } from "react-router-dom";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";

interface Route {
  path: string;
  element: React.ReactElement;
}

export const orderRoutes: Route[] = [
  {
    path: "/order",
    element: <Orders />,
  },
  {
    path: "/order/:orderId",
    element: <OrderDetails />,
  },
  {
    path: "/",
    element: <Navigate to="/order" replace />,
  },
];
