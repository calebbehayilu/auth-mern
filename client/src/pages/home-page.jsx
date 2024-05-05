import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";
import Error from "../components/error";
import usePosts from "../hooks/usePosts";

const HomePage = () => {
  const { isLoading, error, data: posts } = usePosts("/posts");

  return (
    <div className="mx-auto">
      <div className="lg:grid grid-cols-12 gap-3 flex flex-col justify-center items-center">
        <div className="lg:col-span-3 px-3">
          <Sidebar />
        </div>
        {isLoading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
        {error && (
          <div className="mx-10">
            <Error error={error.message} />
          </div>
        )}
        {posts && (
          <div className="lg:col-span-6 rounded-lg">
            {posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
