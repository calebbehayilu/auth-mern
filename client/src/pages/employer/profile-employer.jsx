import React from "react";
import useFetch from "../../utils/useFetch";

const EmployerProfile = ({ userId }) => {
  const { data: user, isPending, error } = useFetch(`/profile/${userId}`);
  if (isPending) return <h1>Loading...</h1>;
  return (
    <div className="">
      <div
        href="#"
        className="block pl-6 py-3 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
      >
        <div className="my-2">
          <span className="text-lg font-light">Contact Phone</span>
          <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            +251 {user.phoneNumber}
          </h5>
        </div>
        <div className="my-2">
          <span className="text-lg font-light">Education Level</span>
          <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.education}
          </h5>
        </div>
        <div className="my-2">
          <span className="text-lg font-light">Experience Level</span>
          <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.experience}
          </h5>
        </div>
        <div className="my-2">
          <span className="text-lg font-light">Work Category</span>
          <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.workCategory.map((tags) => (
              <span class="text-xl font-medium me-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300">
                {tags}
              </span>
            ))}
          </h5>
        </div>
        <div className="my-2">
          <span className="text-lg font-light">Portfolio Link</span>
          <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.resumeLink}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
