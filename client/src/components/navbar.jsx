import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiMenu, BiSearch } from "react-icons/bi";
import userService from "../services/user-service";
import getAvatar from "../utils/create-avatar";
import { BiBell } from "react-icons/bi";

const Navbar = ({ tab, setTab, isRead }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userService
      .getUser()
      .then((res) => setUser(res.data))
      .finally(setIsLoading(false));
  }, [location.pathname]);
  return (
    <div className="navbar bg-base-200 p-5 mb-4 fixed w-full z-20 top-0 start-0 border-b">
      {/* Code Starts Here */}
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
        {isLoading && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        {user ? (
          <div className="flex">
            <form action="" className="hidden md:flex mx-5">
              <label className="input input-bordered rounded-2xl flex justify-around mx-2 ">
                <input type="text" className="grow" placeholder="Search" />
              </label>
              <button className="rounded-2xl btn btn-accent m-0" type="submit">
                <BiSearch />
              </button>
            </form>
            <Link
              to={`/profile/notification`}
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <BiBell size={30} />
                {isRead && (
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                )}
              </div>
            </Link>
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
                className="mt-3 z-[1] space-y-2 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={`/profile/${user._id}`} className="justify-between">
                    Profile
                  </Link>
                </li>

                {user.role === "job_seeker" && (
                  <li>
                    <Link to={"/applied-jobs"}>Applied Jobs</Link>
                  </li>
                )}
                {user.role === "employer" && (
                  <>
                    <li>
                      <Link to={"/create-post"}>Create Post</Link>
                    </li>
                    <li>
                      <Link to={"/employer"}>Posts</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to={"/logout"}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <ul className="menu menu-horizontal px-1 space-x-2">
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
