import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";
import Error from "../components/error";
import usePosts from "../hooks/usePosts";

const HomePage = () => {
  const { isLoading, error, data: posts } = usePosts("/posts");

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
            <div className=" rounded-lg ">
              {posts.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
