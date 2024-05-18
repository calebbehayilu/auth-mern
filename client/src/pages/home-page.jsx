import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";
import Error from "../components/error";
import usePosts from "../hooks/usePosts";
import { useEffect, useState } from "react";
import { sort } from "fast-sort";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/footer";
const HomePage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();
  const search = searchParam.get("search");
  const location = searchParam.get("location");

  const { isLoading, error, data, refetch } = usePosts(
    page,
    pageSize,
    location,
    search
  );
  useEffect(() => {}, [search]);

  const posts = sort(data).desc("postDate");

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="md:mx-auto ">
      <div className="lg:grid grid-cols-12 lg:gap-3 h-screen">
        <div className="hidden lg:flex lg:col-span-3 lg:px-3">
          <Sidebar />
        </div>
        <div className="lg:col-span-6 ">
          {error && (
            <div className="mx-10 my-5">
              <Error error={error.message} />
            </div>
          )}
          {posts && (
            <div className="flex flex-col justify-center mb-2">
              <div className="rounded-lg min-w-4">
                {posts.map((post) => (
                  <PostCard post={post} key={post._id} />
                ))}

                {posts?.length > 0 ? (
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
                ) : (
                  <h1 className="text-warning text-3xl text-center font-semibold m-5">
                    There are No Posts
                  </h1>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {posts && <Footer />}
    </div>
  );
};

export default HomePage;
