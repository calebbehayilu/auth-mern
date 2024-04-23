import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useFetch from "./../utils/useFetch";

const url = import.meta.env.VITE_APP_API_URL;

const Navbar = ({ currentUser }) => {
  const { error, isPending, data: user } = useFetch(`${url}/user/me`);

  const getAvatar = (name) => {
    const getArray = name.split(" ");
    const initials = getArray.map((part) => part.charAt(0));

    return initials.join("");
  };
  console.log(user);
  return (
    <div className="navbar bg-base-200 p-5 mb-4">
      <div className="flex-1">
        <NavLink to={"/home"} className="btn btn-ghost text-xl">
          Qitir Tiri📄
        </NavLink>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user && (
                <>
                  {user?.photoURL ? (
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  ) : (
                    <div className="avatar placeholder">
                      <div className="bg-slate-600 text-neutral-content rounded-full w-10">
                        <span>{getAvatar(user.name)}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/create-post"}>Create Post</Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
              <li>
                <Link to={"/logout"}>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
