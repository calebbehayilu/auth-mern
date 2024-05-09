import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import TableList from "./table";
import Error from "../../components/error";
import { BiCheckCircle } from "react-icons/bi";
import Success from "../../components/success";

const AppliedJobList = () => {
  const [message, setMessage] = useState("");

  const retrievePosts = async () => {
    const response = await apiClient.get(`/applied`);
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["applied"],
    queryFn: retrievePosts,
  });
  const onDelete = async (postId) => {
    await apiClient.delete(`/applied/${postId}`).then((res) => {
      if (!res.status !== 200) {
        setMessage("unexpected error has occoured");
      }
      setMessage("Applied job removed");
      refetch();
    });
  };
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="text-2xl font-semibold m-3">Applied Jobs</h1>

      {isLoading && <span className="loading loading-spinner"></span>}
      {error && <Error error={"Unexpected error has occurred"} />}
      {message && <Success message={message} />}
      {data && (
        <div>
          <TableList posts={data} onDelete={onDelete} />

          {data == "" && (
            <h1 className="text-warning text-3xl text-center font-semibold m-5">
              You haven`t applied to any jobs.
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default AppliedJobList;
