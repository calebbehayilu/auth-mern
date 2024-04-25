import React from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { postId } = useParams();
  console.log();
  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-semibold text-2xl">Job Detail - {postId}</h1>
    </div>
  );
};

export default JobDetail;
