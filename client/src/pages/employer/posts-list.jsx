import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Error from "../../components/error";
import TableList from "./table";
import { BiCheckCircle } from "react-icons/bi";
import { useState } from "react";
import Success from "../../components/success";

const PostsList = () => {
  const [message, setMessage] = useState("");

  const retrievePosts = async () => {
    const response = await apiClient.get(`/employer`);
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posted_jobs"],
    queryFn: retrievePosts,
  });

  const onDelete = async (postId) => {
    await apiClient.delete(`/posts/${postId}`).then((res) => {
      if (!res.status !== 200) {
        setMessage("unexpected error has occoured");
      }
      setMessage("Applied job removed");
      refetch();
    });
  };
  const onActive = async (postId, active) => {
    await apiClient
      .put(`/posts/${postId}`, {
        active: active,
      })
      .then((res) => {
        if (!res.status !== 200) {
          setMessage("unexpected error has occoured");
        }
        active
          ? setMessage("Job post is inactive.")
          : setMessage("Job post is active.");
        refetch();
      });
  };
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="text-2xl font-semibold mb-3">Posts</h1>

      {isLoading && <span className="loading loading-spinner"></span>}
      {error && <Error error={"Unexpected error has occurred"} />}
      {message && <Success message={message} />}
      {data && (
        <div>
          {data.map((post) => (
            <TableList
              key={post._id}
              jobs={post}
              onDelete={onDelete}
              onActive={onActive}
            />
          ))}

          {data.posts == 0 && (
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
