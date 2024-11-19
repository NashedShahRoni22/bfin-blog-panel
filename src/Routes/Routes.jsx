import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Category from "../Pages/Category/Category";
import AddBlogs from "../Pages/AddBlogs/AddBlogs";

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
        path: "/dashboard/category",
        element: <Category />,
      },
      {
        path: "/dashboard/add-blogs",
        element: <AddBlogs />,
      },
    ],
  },
]);
