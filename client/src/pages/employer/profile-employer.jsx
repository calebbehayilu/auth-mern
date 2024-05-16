import React from "react";
import useFetch from "../../utils/useFetch";

const EmployerProfile = ({ userId }) => {
  const {
    data: user,
    isPending,
    error,
  } = useFetch(`/employer/profile/${userId}`);

  if (isPending) return <h1>Loading...</h1>;
  return (
    <div className="">
      <div
        href="#"
        className="block pl-6 py-3 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
      >
        {user.companyName && (
          <div className="my-2">
            <span className="text-lg font-light">Company</span>
            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user.companyName}
            </h5>
          </div>
        )}
        {user.website && (
          <div className="my-2">
            <span className="text-lg font-light">Website</span>
            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user.website}
            </h5>
          </div>
        )}
        <div className="my-2">
          <span className="text-lg font-light">Company Category</span>
          <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.componyCategory.map((tags, i) => (
              <span
                key={i}
                className="text-xl font-medium me-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300"
              >
                {tags}
              </span>
            ))}
          </h5>
        </div>
        {user.additional && (
          <div className="my-2">
            <span className="text-lg font-light">Additional</span>
            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user.additional}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
