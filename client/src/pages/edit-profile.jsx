import React, { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import apiClient from "../services/api-client";
import { BiCheckCircle, BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaLastfmSquare } from "react-icons/fa";
const EditProfile = () => {
  const { error, isPending, data: user } = useFetch(`/user/me`);
  const [message, setMessage] = useState(false);

  const { register, handleSubmit } = useForm();
  const onEdit = async (data) => {
    await apiClient
      .put(`/user/${user._id}`, {
        name: data.name || user.name,
        password: data.password || user.password,
        date: data.date,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMessage(true);
        }
      });
  };

  useEffect(() => {});
  return (
    <div className="">
      {user && (
        <div className="flex justify-center md:p-10 rounded-2xl md:mx-4 ">
          <div className="w-6/12">
            {message && (
              <div role="alert" className="alert alert-success">
                <BiCheckCircle size={22} />
                <span>Update Successful.</span>
                <Link to={"/home"} className="link mr-2">
                  Home
                </Link>
              </div>
            )}
            <div className="flex justify-center m-5">
              <div className="avatar placeholder">
                <div className="bg-slate-600 hover:bg-slate-500 text-neutral-content rounded-full w-24">
                  <BiEdit size={20} />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onEdit)} className="">
              <label className="input input-bordered flex items-center gap-2  mb-3">
                <FaUser />
                <input
                  {...register("name")}
                  name="name"
                  type="text"
                  className="grow"
                  placeholder={user.name}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2  mb-3">
                <IoMdMail />
                <input
                  type="email"
                  className="grow"
                  placeholder={user.email}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2  mb-3">
                <IoKey />
                <input
                  {...register("password")}
                  type="password"
                  className="grow"
                  placeholder="Password"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mb-3">
                <input {...register("date")} type="date" className="grow" />
              </label>
              <button type="submit" className="btn btn-neutral w-full">
                Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
