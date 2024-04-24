import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import ImgPreview from "../img-preview";

const PostCard = ({ post }) => {
  return (
    <div className="card card-bordered bg-base-100 mb-2 mx-3 lg:mx-0 lg:w-full">
      <div className="card-body">
        <ProfileCard user={post.user} />
        <div>
          <h1 className="text-xl font-semibold">{post.title}</h1>
        </div>
        <div className="flex gap-4 m-2">
          <span className="flex items-center gap-1">
            <CiLocationOn />
            {post.location}
          </span>
          <span className="flex items-center gap-1">
            <CiTimer />
            {post.duration}
          </span>
          <span className="flex items-center gap-1">
            <MdAttachMoney />
            {post.minAmount} - {post.maxAmount}
          </span>
          <span className="flex items-center gap-1">
            <CiCalendarDate />
            {post.postDate}
          </span>
        </div>
        <span className="flex gap-3 mx-3">
          {post.tags.map((tag) => (
            <div className="badge badge-neutral" key={tag}>
              {tag}
            </div>
          ))}
        </span>
        <div className="pt-3">
          <p className="w-full">{post.discription}</p>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary rounded-xl">Apply</button>
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
