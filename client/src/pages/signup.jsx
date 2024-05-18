import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import apiClient from "../services/api-client";
import z from "zod";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "../components/error";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userSlice";
import { getCurrentUser } from "../utils/auth";

const signupSchema = z
  .object({
    name: z.string().min(5).max(30),
    email: z.string().email(),
    role: z.string({}).min(1, { message: "Role can`t be empty" }),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password does not match",
    path: ["confirm_password"],
  });

const Signup = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const currentUser = getCurrentUser();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(signupSchema) });

  const signUp = async (user) => {
    const post = await apiClient
      .post(`/user`, {
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      })
      .catch((err) => {
        return err;
      });

    return post;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await signUp(data);

    if (response.status != 200) {
      setIsLoading(false);
      return setError(response.response.data);
    }

    if (response.status == 200) {
      dispatch(setUserInfo(response.data));
      localStorage.setItem("token", response.headers["x-auth-token"]);
      setIsLoading(false);
      window.location = `/finish-up/${response.data._id}`;
    }
  };
  if (currentUser) return <Navigate to="/home" />;

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1 className="text-2xl m-2">Sign Up</h1>
        {error && <Error error={error} />}
        <form
          className="flex flex-col w-full sm:w-96 gap-2"
          onSubmit={handleSubmit(onSubmit)}
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

          <label className="input input-bordered flex items-center gap-2">
            <IoMdMail />
            <input
              {...register("email")}
              name="email"
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>
          {errors.email && (
            <span className="text-error">{errors.email.message}</span>
          )}

          <select
            {...register("role")}
            className="select select-bordered "
            placeholder="Choose A Role"
            defaultValue={""}
          >
            <option>Choose A Role</option>
            <option value={"job_seeker"}>Job Seeker</option>
            <option value={"employer"}>Employer</option>
          </select>
          {errors.role && (
            <span className="text-error">{errors.role.message}</span>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <IoKey />
            <input
              {...register("password")}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>
          {errors.password && (
            <span className="text-error">{errors.password.message}</span>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <IoKey />
            <input
              {...register("confirm_password")}
              name="confirm_password"
              type="password"
              className="grow"
              placeholder="Confirm Password"
            />
          </label>
          {errors.confirm_password && (
            <span className="text-error">
              {errors.confirm_password.message}
            </span>
          )}

          <button
            className="btn btn-primary text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>Sign Up</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
