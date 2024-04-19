import React from "react";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { userInfo } = useSelector((state) => state.user);

  console.log(userInfo);
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3 px-3">
          <Sidebar />
        </div>
        <div className="col-span-6 bg-base-200 p-3 rounded-lg mb-5">
          <div>{userInfo && <h1>{userInfo.name}</h1>}</div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
