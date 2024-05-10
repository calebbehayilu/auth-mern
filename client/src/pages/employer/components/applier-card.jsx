import { Link } from "react-router-dom";
import ImgPreview from "./img-preview";
import { useState } from "react";

const ApplierCard = ({ applierDetail }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="card card-bordered bg-base-100 mb-2 mx-3 lg:mx-0 ">
      <div className="card-body">
        <Link to={`/profile/${applierDetail.userId._id}`}>
          <ProfileCard user={applierDetail.userId} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold my-5">
            {applierDetail.postId.title}
          </h1>
        </div>
        <span className="flex flex-col mx-3">
          <p htmlFor="" className="text-xl font-normal my-5">
            Answers
          </p>
          {applierDetail.answers.map((answer, i) => (
            <div className="" key={i}>
              <div className="font-semibold">
                {i + 1}. {answer.question}
              </div>
              <div className="mx-3 py-2">
                <li>{answer.answer}</li>
              </div>
            </div>
          ))}
        </span>
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-success w-24 place-self-end"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <h1>Accept</h1>
          )}
        </button>
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

export default ApplierCard;
