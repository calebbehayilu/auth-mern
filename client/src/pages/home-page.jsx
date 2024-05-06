import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";
import Error from "../components/error";
import usePosts from "../hooks/usePosts";
import { useState } from "react";

const HomePage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { isLoading, error, data: posts } = usePosts(page, pageSize);
  return (
    <div className="mx-auto">
      <div className="lg:grid grid-cols-12 gap-3 flex  ">
        <div className="lg:col-span-3 px-3">
          <Sidebar />
        </div>
        <div className="lg:col-span-6">
          {isLoading && (
            <div className="flex flex-col justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {error && (
            <div className="mx-10 my-5">
              <Error error={error.message} />
            </div>
          )}
          {posts && (
            <div className="flex flex-col justify-center">
              <div className="  rounded-lg ">
                {posts.map((post) => (
                  <PostCard post={post} key={post._id} />
                ))}

                <div className="join grid grid-cols-2 mx-auto my-2 max-w-md ">
                  <button
                    className="join-item btn "
                    onClick={() => {
                      setPage(page - 1);
                    }}
                    disabled={page === 1}
                  >
                    Previous page
                  </button>
                  <button
                    className="join-item btn "
                    disabled={posts.length <= 9}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
