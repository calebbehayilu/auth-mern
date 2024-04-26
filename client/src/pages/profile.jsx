import React, { useState } from "react";
import useFetch from "../utils/useFetch";
import Error from "../components/error";
import { BiCalendar, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import apiClient from "../services/api-client";
import { Link, useNavigate } from "react-router-dom";
import getAvatar from "./../utils/create-avatar";

const Profile = () => {
  const navigate = useNavigate();
  const { error, isPending, data: user } = useFetch(`/user/me`);
  const { confirm, setConfirm } = useState(false);

  const { deleteAcc, setDeleteAcc } = useState(false);

  const deleteAccount = (id) => {
    setConfirm(true);

    if (deleteAcc) {
      apiClient.delete(`/user/${id}`).then((res) => {
        if (res.data === true) {
          navigate("/logout");
        }
      });
    }

    setConfirm(false);
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
              <Link to={"/edit-profile"} className="btn btn-neutral ">
                Edit
              </Link>
              <button
                className="btn btn-error"
                onClick={() => deleteAccount(user._id)}
              >
                Delete Account
              </button>
            </div>

            {confirm && (
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            )}
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
