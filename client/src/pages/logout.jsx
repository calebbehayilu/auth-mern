import { useEffect } from "react";
import { logout } from "../utils/auth";

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <span className="loading loading-spinner loading-xs"></span>
      <h1>Logging Out</h1>
    </div>
  );
};

export default Logout;
