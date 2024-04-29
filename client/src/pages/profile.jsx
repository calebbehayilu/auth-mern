import React, { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import Error from "../components/error";
import { BiCalendar, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import getAvatar from "./../utils/create-avatar";
import apiClient from "../services/api-client";
import { getCurrentUser } from "./../utils/auth";

const Profile = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { error, isPending, data: user } = useFetch(`/user/${userId}`);
  const [confirm, setConfirm] = useState(false);

  const AccountDelete = async () => {
    if (confirm) {
      apiClient.delete(`/user/${user._id}`).then((res) => {
        if (res.data === true) {
          navigate("/logout");
        }
      });
    }
  };
  const onDelete = () => {
    document.getElementById("modal").showModal();
  };
  useEffect(() => {
    AccountDelete();
  }, [confirm]);
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
            {currentUser.id == user._id && (
              <div className="flex justify-between mt-5">
                <Link to={"/edit-profile"} className="btn btn-neutral ">
                  Edit
                </Link>
                <button className="btn btn-error" onClick={() => onDelete()}>
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <dialog id="modal" className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-lg text-center w-30">
            Are You Sure You Want To Delete This Account?
          </h3>
          <div className="flex justify-evenly m-5">
            <form method="dialog" className="btn btn-accent">
              <button>close</button>
            </form>
            <button
              className="btn btn-error"
              onClick={() => {
                setConfirm(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
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
