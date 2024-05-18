import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const AdminRoutes = () => {
  const auth = getCurrentUser();

  if (auth.role !== "admin") {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
};

export default AdminRoutes;
