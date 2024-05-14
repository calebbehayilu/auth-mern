import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";
import Error from "../components/error";
import usePosts from "../hooks/usePosts";
import { useEffect, useState } from "react";
import { sort } from "fast-sort";
import { useParams, useSearchParams } from "react-router-dom";
const HomePage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState();
  const [searchParam, setSearchParam] = useSearchParams();
  const search = searchParam.get("search");

  const { isLoading, error, data, refetch } = usePosts(
    page,
    pageSize,
    location,
    search
  );
  useEffect(() => {}, [search]);

  const posts = sort(data).desc("postDate");
  return (
    <div className="md:mx-auto">
      <div className="lg:grid grid-cols-12 lg:gap-3 ">
        <div className="lg:col-span-3 lg:px-3">
          <Sidebar setLocation={setLocation} refetch={refetch} />
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
              <div className="rounded-lg">
                {posts.map((post) => (
                  <PostCard post={post} key={post._id} />
                ))}

                {posts != [] && (
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
