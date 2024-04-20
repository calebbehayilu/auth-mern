import React from "react";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { userInfo } = useSelector((state) => state.user);

  console.log(userInfo);
  return (
    <div className="mx-auto">
      <div className="lg:grid grid-cols-12 gap-3 flex flex-col m-5">
        <div className="col-span-3 px-3 display">
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
