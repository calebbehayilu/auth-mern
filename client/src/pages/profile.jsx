import axios from "axios";
import React, { useEffect } from "react";
import useFetch from "../utils/useFetch";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const {
    error,
    isPending,
    data: user,
  } = useFetch("http://localhost:3000/user/me");

  return (
    <div className="flex flex-col h-screen m-auto text-3xl px-24">
      Profile
      <div className="container-lg">
        {error && <Error error={error} />}
        {isPending && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        {user && (
          <div className="p-5">
            <div className="text-lg flex  items-center align-middle p-1">
              <FaUser />
              <span className="px-2">{user.name}</span>
            </div>
            <div className="text-lg flex items-center align-middle p-1">
              <IoMdMail />
              <span className="px-2">{user.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
