import { useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../utils/useFetch";
import { FaUser } from "react-icons/fa";
import apiClient from "../services/api-client";
import { getCurrentUser } from "../utils/auth";
import { Link } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userSlice";

const GoogleRedirect = () => {
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: user } = useFetch(`/user/me`);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onEdit = async (data) => {
    setIsLoading(true);
    await apiClient
      .put(`/user/${user._id}`, {
        name: data.name || user.name,
        role: data.role,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUserInfo(res.data));
          localStorage.setItem("token", res.headers["x-auth-token"]);
          window.location = "/home";
          setIsLoading(false);
        }
      })
      .catch((res) => {
        setIsLoading(false);
        setMessage(res.response.data);
      });
  };
  if (currentUser.role) return (window.location = "/home");

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1 className="text-2xl m-2">Finish Up</h1>
        {message && (
          <div role="alert" className="my-3 max-w-96 alert alert-success">
            <BiCheckCircle size={22} />
            <span>{message}</span>
            <Link to={"/home"} className="link mr-2">
              Home
            </Link>
          </div>
        )}
        <form
          className="flex flex-col w-96 gap-2"
          onSubmit={handleSubmit(onEdit)}
        >
          <label className="input input-bordered flex items-center gap-2">
            <FaUser />
            <input
              {...register("name")}
              name="name"
              type="text"
              className="grow"
              placeholder="Name"
            />
          </label>
          {errors.name && (
            <span className="text-error">{errors.name.message}</span>
          )}

          <select
            {...register("role", { required: "Role is required." })}
            className="select select-bordered "
            placeholder="Choose A Role"
          >
            <option disabled selected value={""}>
              Choose A Role
            </option>
            <option value={"job_seeker"}>Job Seeker</option>
            <option value={"employer"}>Employer</option>
          </select>
          {errors.role && (
            <span className="text-error">{errors.role.message}</span>
          )}
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <input {...register("date")} type="date" className="grow" />
          </label>
          {errors.date && (
            <span className="text-error">{errors.date.message}</span>
          )}
          <button
            className="btn btn-primary text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>Submit</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoogleRedirect;
