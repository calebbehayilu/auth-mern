import React, { useState } from "react";
import apiClient from "../../services/api-client";
import { CiLocationOn } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import ImgPreview from "./../../components/img-preview";
import { useForm } from "react-hook-form";
import { IoDocumentsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Error from "./../../components/error";
import { getCurrentUser } from "../../utils/auth";

const JobDetailCard = ({ post }) => {
  const user = getCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    await apiClient
      .post(`/apply/${post._id}`, {
        answers: [...data.answers],
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((res) => {
        setIsLoading(false);
        setError(res.response.data);
      });
  };
  return (
    <div className="card card-bordered w-full bg-base-100 mb-2 lg:mx-0 lg:max-w-3xl">
      {error && <Error error={error} />}
      <div className="card-body">
        <Link to={`/profile/${post.userId._id}`}>
          <ProfileCard user={post.userId} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">{post.title}</h1>
        </div>
        <div className="flex flex-col gap-4 m-2">
          <span className="flex items-center gap-3">
            <CiLocationOn size={25} />
            {post.location}
          </span>
          <span className="flex items-center gap-3">
            <IoDocumentsOutline size={25} />
            {post.jobType}
          </span>
          <span className="flex items-center gap-3">
            <MdAttachMoney size={25} />
            {post.minAmount} - {post.maxAmount}
          </span>
          <span className="flex items-center gap-3">
            <CiCalendarDate size={25} />
            {new Date(post.postDate).toDateString()}
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

        {user.role === "job_seeker" && (
          <div>
            <label htmlFor="" className="text-xl font-normal my-5">
              Questions
            </label>
            <form
              action=""
              className="flex flex-col my-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              {post.questions &&
                post.questions.map((question, i) => (
                  <div key={i} className="flex flex-col mb-3">
                    <label className="my-3">
                      {i + 1}. {question}
                    </label>
                    <input
                      {...register(`answers[${i}]`, {
                        required: "This is required.",
                      })}
                      className="input input-bordered"
                      type="text"
                    />
                    {errors && errors.answers && errors.answers[i] && (
                      <span className="text-error">
                        {errors.answers[i].message}
                      </span>
                    )}
                  </div>
                ))}

              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <h1>Apply</h1>
                )}
              </button>
            </form>
          </div>
        )}
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

export default JobDetailCard;
