import React from "react";
import { useParams } from "react-router-dom";

const ApplyPage = () => {
  const params = useParams();
  return <div>ApplyPage - {params.postId}</div>;
};

export default ApplyPage;
