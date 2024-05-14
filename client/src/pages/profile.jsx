import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import Error from "../components/error";
import { Link, useNavigate, useParams } from "react-router-dom";
import getAvatar from "./../utils/create-avatar";
import apiClient from "../services/api-client";
import { getCurrentUser } from "./../utils/auth";
import JobSeekerProfile from "./job-seeker/profile-jobseeker";
import EmployerProfile from "./employer/profile-employer";

const Profile = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { error, isPending, data: user } = useFetch(`/user/${userId}`);
  const [confirm, setConfirm] = useState(false);

  const AccountDelete = async () => {
    if (confirm) {
      apiClient.delete(`/user/${user._id}`).then((res) => {
        if (res.data === true) {
          navigate("/logout");
        }
      });
    }
  };
  const onDelete = () => {
    document.getElementById("modal").showModal();
  };
  useEffect(() => {
    AccountDelete();
  }, [confirm]);
  return (
    <div className="flex flex-col justify-center w-full items-center m-auto">
      {isPending && (
        <div className="flex flex-col justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && <Error error={error} />}
      {user && (
        <div className="w-full md:w-3/5 lg:w-3/5 p-5 space-y-3">
          <div
            href="#"
            className="block pl-6 pb-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
          >
            {currentUser.id == user._id ? (
              <div className="flex justify-end px-4 pt-4 dropdown dropdown-end">
                <button
                  tabIndex={0}
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 focus:ring-4 focus:outline-none dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  tabIndex={0}
                  className="menu menu-sm dropdown-content z-[1] text-base list-none bg-white divide-y divide-gray-100 rounded-box shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    tabIndex={0}
                    className="py-2"
                    aria-labelledby="dropdownButton"
                  >
                    <li>
                      <Link
                        to={"/edit-profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Export Data
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => onDelete()}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="pb-6"></div>
            )}

            <div className="avatar mb-5">
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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {user.email}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {user.role === "job_seeker" ? <>JobSeeker</> : <>Employer</>}
            </p>
          </div>
          {user.role === "job_seeker" ? (
            <JobSeekerProfile userId={userId} />
          ) : (
            <EmployerProfile userId={userId} />
          )}
        </div>
      )}
      <dialog id="modal" className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-lg text-center w-30">
            Are You Sure You Want To Delete This Account?
          </h3>
          <div className="flex justify-evenly m-5">
            <form method="dialog" className="btn btn-accent">
              <button>close</button>
            </form>
            <button
              className="btn btn-error"
              onClick={() => {
                setConfirm(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
export default Profile;
