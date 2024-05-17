import React from "react";
import { BiMessage, BiPaperclip, BiUser } from "react-icons/bi";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className=" px-3 py-4 ">
      <ul className="font-light">
        <li>
          <Link
            to={"/dashboard"}
            className="flex items-center font-medium p-5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 "
          >
            <span className="ms-3 pb-5">📄Qitir Tiri Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/inbox"}
            className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 "
          >
            <BiMessage size={20} />
            <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              3
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/users"}
            className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 "
          >
            <BiUser size={20} />
            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/posts"}
            className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 "
          >
            <BiPaperclip size={20} />
            <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 "
          >
            <LuLogIn size={20} />
            <span className="flex-1 ms-3 whitespace-nowrap">Log In</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
