import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";
import useFetch from "./../utils/useFetch";
import Error from "../components/error";

const HomePage = () => {
  const { isLoading, error, data: posts } = useFetch("/posts");

  return (
    <div className="mx-auto">
      <div className="lg:grid grid-cols-12 gap-3 flex flex-col">
        <div className="lg:col-span-3 px-3">
          <Sidebar />
        </div>
        {isLoading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
        {error && <Error error={error.message} />}
        {posts ? (
          <div className="lg:col-span-6 rounded-lg">
            {posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>
        ) : (
          <span className="text-2xl text-info">No Posts </span>
        )}
      </div>
    </div>
  );
};

export default HomePage;
