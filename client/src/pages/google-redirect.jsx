import { useState } from "react";
import { useForm } from "react-hook-form";
import Error from ".././components/error";
import useFetch from "../utils/useFetch";
import { FaUser } from "react-icons/fa";
import apiClient from "../services/api-client";
const GoogleRedirect = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: user } = useFetch(`/user/me`);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onEdit = async (data) => {
    if (data.name == "" && data.date == "" && data.password == "") {
      return setMessage("No change has been made.");
    }
    setIsLoading(true);
    await apiClient
      .put(`/user/${user._id}`, {
        name: data.name || user.name,
        password: data.password || user.password,
        date: data.date,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Update Successful.");
          setIsLoading(false);
        }
      })
      .catch((res) => {
        setIsLoading(false);

        setMessage(res.response.data);
      });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1 className="text-2xl m-2">Sign Up</h1>
        {message && <Error error={message} />}
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
            {...register("role")}
            className="select select-bordered "
            placeholder="Choose A Role"
          >
            <option disabled selected>
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
