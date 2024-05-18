import React from "react";
import useFetch from "../../utils/useFetch";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
const JobSeekerProfile = ({ userId }) => {
  const { data: user, isPending, error } = useFetch(`/applied/${userId}`);
  if (isPending) return <h1>Loading...</h1>;
  return (
    <div className="">
      <div
        href="#"
        className="block pl-6 py-3 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
      >
        {user?.phoneNumber && (
          <div className="my-2">
            <span className="text-lg font-light">Contact Phone</span>
            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              +251 {user.phoneNumber}
            </h5>
          </div>
        )}
        {user?.education && (
          <div className="my-2">
            <span className="text-lg font-light">Education Level</span>
            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {toTitleCase(user?.education)}
            </h5>
          </div>
        )}
        {user?.experience && (
          <div className="my-2">
            <span className="text-lg font-light">Experience Level</span>
            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {toTitleCase(user?.experience)}
            </h5>
          </div>
        )}
        <div className="my-2">
          <span className="text-lg font-light">Work Category</span>
          <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user?.workCategory.map((tags, i) => (
              <span
                key={i}
                className="text-xl font-medium me-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300"
              >
                {tags}
              </span>
            ))}
          </h5>
        </div>
        {user?.resumeData && (
          <div className="my-2">
            <span className="text-lg font-light">CV</span>
            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <Link to={user?.resumeData} className="btn btn-outline w-20">
                <FaDownload />
              </Link>
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

function toTitleCase(inputString) {
  const words = inputString.split("_");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const result = capitalizedWords.join(" ");

  return result;
}

export default JobSeekerProfile;
