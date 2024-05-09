/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import formatDate from "../../../utils/formatdate";

const AppliedCard = ({ applier }) => {
  return (
    <div
      key={applier.id}
      className="flex justify-between items-center bg-gray-800  border-b border-gray-700 "
    >
      {/* <Link to={`/profile/${applier.userId._id}`}> */}

      <Link to={`/employer/answers/${applier._id}`}>
        <p
          scope="row"
          className="flex px-6 py-4 font-medium text-white hover:text-blue-300"
        >
          {applier.userId.name}
        </p>
        <div className="w-fit"></div>
      </Link>
      <div className="flex justify-start items-center">
        <p className="px-6 py-4">{formatDate(applier.appliedTime)}</p>
        <div className="px-6 py-4">
          <section className="px-6 py-4 w-32">
            <a href="#" className="font-medium hover:underline ">
              {applier?.accept ? (
                <span className="text-red-500">Remove</span>
              ) : (
                <span className="text-blue-500">Accept</span>
              )}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppliedCard;
