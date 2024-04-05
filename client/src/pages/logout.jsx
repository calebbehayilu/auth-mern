import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Logout = () => {
  const history = useNavigate();

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
