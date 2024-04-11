import React, { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import Pagination from "../components/usePagination";
import { paginate } from "./../utils/paginate";
import Error from "../components/error";
import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";

const Welcome = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const count = blogs?.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const blogsPaginate = paginate(blogs, currentPage, pageSize);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3 px-3">
          <Sidebar />
        </div>
        <div className="col-span-6 bg-base-200 p-3 rounded-lg mb-5">
          {error && <Error error={error} />}
          {isPending && (
            <div className="container mx-auto p-4 flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          )}
          {blogs && (
            <div className="flex flex-col justify-center items-center min-h-5/6">
              {blogsPaginate?.map((user) => (
                <PostCard user={user} />
              ))}

              <Pagination
                itemsCount={count}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
