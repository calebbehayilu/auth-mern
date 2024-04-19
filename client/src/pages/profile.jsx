import axios from "axios";
import React, { useEffect } from "react";
import useFetch from "../utils/useFetch";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const url = import.meta.env.VITE_APP_API_URL;

  const { error, isPending, data: user } = useFetch(`${url}/user/me`);

  return (
    <div className="flex flex-col h-screen m-auto  px-24">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3 px-3"></div>
        <div className="col-span-6 bg-base-200 p-3 rounded-lg mb-5">
          <h1 className="text-3xl">Profile</h1>
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
      </div>
    </div>
  );
};

export default Profile;
