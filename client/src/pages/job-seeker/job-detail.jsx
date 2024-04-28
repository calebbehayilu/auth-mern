import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./../../utils/useFetch";
import Error from "./../../components/error";
import PostCard from "./../../components/home-page/post-card";

const JobDetail = () => {
  const { postId } = useParams();
  const { isLoading, error, data: post } = useFetch(`/posts/${postId}`);
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="font-semibold text-2xl">Job Detail</h1>
      {error && <Error error={error.message} />}
      {isLoading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      {post && (
        <div className="m-5">
          <PostCard post={post} />
        </div>
      )}
    </div>
  );
};

export default JobDetail;
