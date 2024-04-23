import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

const PostCard = ({ user }) => {
  if (!user) return <h1> No user </h1>;
  return (
    <div className="card card-bordered border-blue-300 m-2 w-full">
      <div className="card-body">
        <div>
          <h2 className="card-title">{user.name}</h2>
          <span className="text-sm">{user.email}</span>
        </div>

        <div className="flex gap-4 m-2">
          <span className="flex items-center gap-1">
            <CiLocationOn />
            Harar
          </span>
          <span className="flex items-center gap-1">
            <CiTimer />
            Full Time
          </span>
          <span className="flex items-center gap-1">
            <MdAttachMoney />
            8000
          </span>
          <span className="flex items-center gap-1">
            <CiCalendarDate />
            02-05-2024
          </span>
        </div>
        <span className="flex gap-3 mx-3">
          <div className="badge badge-neutral">C#</div>
          <div className="badge badge-neutral">API</div>
          <div className="badge badge-neutral">Backend</div>
        </span>
        <div className="pt-3">
          <p className="w-full">
            We are looking for a talented and passionate full-stack website
            creator to join our team! In this role, you will be responsible for
            the entire website development lifecycle, from design and user
            interface (UI) development to back-end functionality and database
            management.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary rounded-xl">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
