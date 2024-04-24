import axios from "axios";
import React, { useEffect } from "react";
import useFetch from "../utils/useFetch";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Error from "../components/error";
import { BiCalendar, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const { error, isPending, data: user } = useFetch(`/user/me`);
  const getAvatar = (name) => {
    const getArray = name.split(" ");
    const initials = getArray.map((part) => part.charAt(0));

    return initials.join("");
  };

  return (
    <div className="flex flex-col justify-center md:items-center mx-4 md:m-auto">
      {isPending && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {error && <Error error={error} />}
      {user && (
        <div className=" md:p-10 rounded-2xl md:mx-4 md:min-w-6/16">
          <h1 className="text-2xl text-center">Profile</h1>
          <div className="">
            <div className="avatar my-5">
              {user?.photoURL ? (
                <div className="w-24 rounded-full">
                  <img src={user.photoURL} />
                </div>
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-slate-600 text-neutral-content rounded-full w-24">
                    <span className="text-2xl">{getAvatar(user.name)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="">
              <UserProfile icon={<BiUser size={35} />} text={user.name} />
              <UserProfile icon={<MdEmail size={35} />} text={user.email} />
              <UserProfile
                icon={<BiCalendar size={35} />}
                text={"20-04-2004"}
              />
            </div>
            <div className="flex justify-between mt-5">
              <button className="btn btn-neutral ">Edit</button>
              <button className="btn btn-error">Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;

const UserProfile = ({ icon, text }) => {
  return (
    <div className="my-2 flex items-center">
      <span className="p-3">{icon}</span>
      <p className="text-2xl">{text}</p>
    </div>
  );
};
