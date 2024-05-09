import React from "react";
import { BiCheckCircle } from "react-icons/bi";

const Success = ({ message }) => {
  return (
    <div
      role="alert"
      className="w-9/12 mb-3 flex justify-center items-center alert alert-success"
    >
      <BiCheckCircle size={22} />
      <span>{message}</span>
    </div>
  );
};

export default Success;
