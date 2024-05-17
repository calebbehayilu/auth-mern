import React from "react";

const HelpPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="max-w-md w-full p-6  shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Welcome to Job Portal Help
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Whether you're a job seeker or an employer, we're here to help you
          navigate the world of job portals. From optimizing your profile to
          posting the perfect job listing, we've got you covered.
        </p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          For Job Seekers
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Discover tips and tricks for crafting a standout resume, acing your
          interviews, and finding the job that fits your skills and passions.
        </p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          For Employers
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Learn how to attract top talent, streamline your hiring process, and
          create job postings that get noticed by the right candidates.
        </p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Get Started
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Ready to take the next step in your job search or hiring journey?
          Explore our resources and start optimizing your job portal experience
          today.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
