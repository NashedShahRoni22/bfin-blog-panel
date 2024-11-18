import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddBlogs from "../Pages/AddBlogs/AddBlogs";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/add-blogs",
        element: <AddBlogs />,
      },
    ],
  },
]);
