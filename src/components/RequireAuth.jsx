import { Navigate } from "react-router-dom";

export default function RequireAuth({ page }) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  /* if (!user) {
    return <Navigate to="/" replace />;
  } */

  return page;
}
