import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../utils/auth";
import Error from "../components/error";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import GoogleSignup from "../components/google-signup";

const Login = ({ currentUser }) => {
  const [error, setError] = useState({
    caught: false,
    cause: "",
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password == "" || user.email == "")
      return setError((prev) => ({
        caught: true,
        cause: "Can`t leave the text filed empty!",
      }));

    const res = await login(user);
    if (res.response.status !== 200) {
      setError((prev) => ({
        caught: true,
        cause: "Wrong Email or Password!",
      }));
    }
  };

  const handleChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  if (currentUser) return <Navigate to="/home" />;

  return (
    <div className=" flex flex-col justify-center items-center m-5">
      <div className="min-w-fit">
        <h1 className="text-2xl m-2 text-center">Login</h1>

        <form className="flex flex-col w-96 gap-2 pb-2" onSubmit={handleSubmit}>
          {error.caught && <Error error={error.cause} />}

          <label className="input input-bordered flex items-center gap-2">
            <IoMdMail />
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <IoKey />
            <input
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>

          <button className="btn btn-primary text-white" type="submit">
            Login
          </button>
        </form>

        <div className="divider "></div>
        <GoogleSignup />
      </div>
    </div>
  );
};

export default Login;
