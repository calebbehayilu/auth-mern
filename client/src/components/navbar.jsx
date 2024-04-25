import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiMenu, BiSearch } from "react-icons/bi";
import userService from "../services/user-service";
import getAvatar from "../utils/create-avatar";
import ImgPreview from "./img-preview";
const Navbar = ({ currentUser, tab, setTab }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userService
      .getUser()
      .then((res) => setUser(res.data))
      .finally(setIsLoading(false));
  }, []);

  return (
    <div className="navbar bg-base-200 p-5 mb-4">
      <div className="flex-1">
        <button
          onClick={() => {
            setTab(!tab);
          }}
          className="md:hidden btn btn-ghost rounded-2xl"
        >
          <BiMenu size={30} />
        </button>
        <NavLink to={"/home"} className="btn btn-ghost text-xl">
          Qitir Tiri📄
        </NavLink>
      </div>

      <div className="flex-none">
        {user ? (
          <div className="flex">
            <form action="" className="hidden md:flex mx-5">
              <label className="input input-bordered rounded-2xl flex justify-around mx-2 ">
                <input type="text" className="grow" value="Search" />
              </label>
              <button className="rounded-2xl btn btn-accent m-0" type="submit">
                <BiSearch />
              </button>
            </form>

            <div className="dropdown dropdown-end  gap-2">
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
                          <span>{getAvatar(user?.name)}</span>
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
                  <Link to={"/logout"}>Logout</Link>
                </li>
              </ul>
            </div>
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
