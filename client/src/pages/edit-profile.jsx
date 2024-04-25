import React from "react";
import useFetch from "../utils/useFetch";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";

const EditProfile = () => {
  const { error, isPending, data: user } = useFetch(`/user/me`);
  const getAvatar = (name) => {
    const getArray = name.split(" ");
    const initials = getArray.map((part) => part.charAt(0));

    return initials.join("");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      {user && (
        <div className="flex justify-center md:p-10 rounded-2xl md:mx-4 md:min-w-6/16">
          <div className="">
            <div className="flex flex-col justify-center">
              <div className="avatar my-5 place-content-center">
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
            </div>

            <div className="flex flex-col gap-2">
              <label className="input input-bordered flex items-center gap-2">
                <FaUser />
                <input
                  name="name"
                  type="text"
                  className="grow"
                  placeholder={user.name}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <IoMdMail />
                <input
                  type="email"
                  className="grow"
                  placeholder={user.email}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <IoKey />
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="date" className="grow" />
              </label>
              <button className="btn btn-neutral w-full">Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
