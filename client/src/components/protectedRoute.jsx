import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const PrivateRoutes = () => {
  const auth = getCurrentUser();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
