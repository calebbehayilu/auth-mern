import { CiLocationOn } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import ImgPreview from "../img-preview";
import { Link, NavLink } from "react-router-dom";
import formatDate from "../../utils/formatdate";
import { getCurrentUser } from "../../utils/auth";

const PostCard = ({ post }) => {
  const user = getCurrentUser();

  return (
    <div className="card card-bordered bg-base-100 mb-2 mx-3 lg:mx-0 ">
      <NavLink id="job_detail" to={`/jobdetail/${post._id}`}>
        <div className="card-body ">
          <Link id="profile" to={`/profile/${post.userId._id}`}>
            <ProfileCard user={post.userId} />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">{post.title}</h1>
          </div>
          <div className="md:flex items-center gap-4 m-2 space-y-3 md:space-y-0">
            <span className="flex items-center gap-1 my-2">
              <CiLocationOn size={25} />
              {post.location.map((city, i) => (
                <span key={i}>{city}</span>
              ))}
            </span>
            <span className="flex items-center gap-1 my-2">
              <CiTimer size={25} />
              {post.jobType}
            </span>
            <span className="flex items-center gap-1 my-2">
              <MdAttachMoney size={25} />
              {post.minAmount} - {post.maxAmount}
            </span>
            <span className="flex items-center gap-1 my-2">
              <CiCalendarDate size={25} />
              {formatDate(post.postDate)}
            </span>
          </div>
          <span className="flex gap-3 mx-3">
            {post.tags.map((tag, i) => (
              <div className="badge badge-accent badge-md" key={i}>
                {tag}
              </div>
            ))}
          </span>
          <div className="pt-3">
            <p className="w-full">{post.description}</p>
          </div>

          {user.role === "job_seeker" && (
            <div className="flex justify-end">
              <Link
                id="apply"
                to={`/jobdetail/${post._id}`}
                className="btn btn-primary rounded-xl"
              >
                Apply
              </Link>
            </div>
          )}
        </div>
      </NavLink>
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
