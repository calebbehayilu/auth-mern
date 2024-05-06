import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const JobSeekerRoutes = () => {
  const auth = getCurrentUser();
  if (auth.role !== "job_seeker") {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
};

export default JobSeekerRoutes;
