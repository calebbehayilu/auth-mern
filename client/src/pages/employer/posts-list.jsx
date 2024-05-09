import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Error from "../../components/error";
import TableList from "./table";

const PostsList = () => {
  const retrievePosts = async () => {
    const response = await apiClient.get(`/employer`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["posted_jobs"],
    queryFn: retrievePosts,
    staleTime: 1 * 60 * 1000,
  });
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="text-2xl font-semibold mb-3">Posts</h1>

      {isLoading && <span className="loading loading-spinner"></span>}
      {error && <Error error={"Unexpected error has occurred"} />}
      {data && (
        <div>
          {data.map((post) => (
            <TableList key={post._id} jobs={post} />
          ))}

          {data == "" && (
            <h1 className="text-warning text-3xl text-center font-semibold m-5">
              There are No Posts
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default PostsList;
