import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import ImgPreview from "../img-preview";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const getFormattedDate = (newDate) => {
    const formattedDate = new Date(newDate);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const date = formattedDate.getDate();

    return `${year}-${month}-${date}`;
  };
  return (
    <div className="card card-bordered bg-base-100 mb-2 mx-3 lg:mx-0 lg:w-full">
      <div className="card-body">
        <Link to={`/profile/${post.userId._id}`}>
          <ProfileCard user={post.userId} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">{post.title}</h1>
        </div>
        <div className="md:flex gap-4 m-2">
          <span className="flex items-center gap-1 my-2">
            <CiLocationOn size={25} />
            {post.location}
          </span>
          <span className="flex items-center gap-1 my-2">
            <CiTimer size={25} />
            {post.jobDuration}
          </span>
          <span className="flex items-center gap-1 my-2">
            <MdAttachMoney size={25} />
            {post.minAmount} - {post.maxAmount}
          </span>
          <span className="flex items-center gap-1 my-2">
            <CiCalendarDate size={25} />
            {getFormattedDate(post.postDate)}
          </span>
        </div>
        <span className="flex gap-3 mx-3">
          {post.tags.map((tag) => (
            <div className="badge badge-neutral badge-md" key={tag}>
              {tag}
            </div>
          ))}
        </span>
        <div className="pt-3">
          <p className="w-full">{post.description}</p>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/jobdetail/${post._id}`}
            className="btn btn-primary rounded-xl"
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ user }) => {
  return (
    <div className="flex items-center">
      <ImgPreview user={user} size={"w-14"} />
      <div>
        <h2 className="card-title">{user.name}</h2>
        <span className="text-sm">{user.email}</span>
      </div>
    </div>
  );
};

export default PostCard;
