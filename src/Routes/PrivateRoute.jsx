import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");

  return accessToken ? children : <Navigate to="/" />;
}
