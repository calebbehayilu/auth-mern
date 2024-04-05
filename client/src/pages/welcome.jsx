import React, { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import Pagination from "../components/usePagination";
import { paginate } from "./../utils/paginate";
import Error from "../components/error";

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
    <div className="flex flex-col h-screen m-auto text-3xl items-center overflow-hidden">
      Welcome
      <div className="flex flex-col ">
        {error && <Error error={error} />}
        {isPending && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        {blogs && (
          <div className="flex flex-col items-center">
            {blogsPaginate?.map((blog) => (
              <div className="card card-bordered border-blue-300 m-2 w-56">
                <div className="card-body">
                  <h2 className="card-title">{blog.name}</h2>
                </div>
              </div>
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
  );
};

export default Welcome;
