import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser, login } from "../utils/auth";
import Error from "../components/error";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import GoogleSignup from "../components/google-signup";
import { setUserInfo } from "../redux/userSlice";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Email can`t be empty" }).email(),
  password: z.string({ required_error: "Password can`t be empty" }).min(6),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(loginSchema) });
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const res = await login(data);
    setIsLoading(false);

    if (res.status !== 200) {
      return setError(res.response.data);
    }

    if (res.status === 200) {
      dispatch(setUserInfo(res.data));
      localStorage.setItem("token", res.headers["x-auth-token"]);

      if (res.data.role == "admin") return navigate("/admin");

      window.location = "/home";
    }
  };

  if (currentUser) return <Navigate to="/home" />;

  return (
    <div className=" flex flex-col justify-center items-center m-5">
      <div className="min-w-fit">
        <h1 className="text-2xl m-2 text-center">Login</h1>

        <form
          className="flex flex-col w-96 gap-2 pb-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && <Error error={error} />}

          <label className="input input-bordered flex items-center gap-2">
            <IoMdMail />
            <input
              {...register("email")}
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>
          {errors.email && (
            <span className="text-error">{errors.email.message}</span>
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

          <button
            className="btn btn-primary text-white btn-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>Login</>
            )}
          </button>
        </form>

        <div className="divider "></div>
        <GoogleSignup />
      </div>
    </div>
  );
};

export default Login;
