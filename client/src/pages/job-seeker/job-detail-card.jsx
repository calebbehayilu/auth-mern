import { CiLocationOn } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import ImgPreview from "./../../components/img-preview";

const JobDetailCard = ({ post }) => {
  const getFormattedDate = (newDate) => {
    const formattedDate = new Date(newDate);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const date = formattedDate.getDate();

    return `${year}-${month}-${date}`;
  };
  return (
    <div className="card card-bordered max-w-2xl  bg-base-100 mb-2 mx-3 lg:mx-0 lg:w-full">
      <div className="card-body">
        <Link to={`/profile/${post.userId._id}`}>
          <ProfileCard user={post.userId} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">{post.title}</h1>
        </div>
        <div className="flex flex-col gap-4 m-2">
          <span className="flex items-center gap-1">
            <CiLocationOn />
            {post.location}
          </span>
          <span className="flex items-center gap-1">
            <CiTimer />
            {post.jobDuration}
          </span>
          <span className="flex items-center gap-1">
            <MdAttachMoney />
            {post.minAmount} - {post.maxAmount}
          </span>
          <span className="flex items-center gap-1">
            <CiCalendarDate />
            {getFormattedDate(post.postDate)}
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
const QuestionsInput = ({ questions }) => {
  return (
    <div>
      <form action="">
        {questions &&
          questions.map((question, i) => (
            <div>
              <lable>
                {i + 1}. {question}
              </lable>
              <input type="text" />
            </div>
          ))}

        <button className="btn">Submit</button>
      </form>
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

export default JobDetailCard;
