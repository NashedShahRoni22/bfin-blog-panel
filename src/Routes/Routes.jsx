import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Main />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
