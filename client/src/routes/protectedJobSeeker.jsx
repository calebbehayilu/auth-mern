import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const EmployerRoutes = () => {
  const auth = getCurrentUser();

  if (auth.role !== "job_seeker") {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
};

export default EmployerRoutes;
