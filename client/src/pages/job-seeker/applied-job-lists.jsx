import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import TableList from "./table";
import Error from "../../components/error";

const AppliedJobList = () => {
  const [message, setMessage] = useState("");

  const retrievePosts = async () => {
    const response = await apiClient.get(`/applied`);
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["applied"],
    queryFn: retrievePosts,
    staleTime: 1 * 60 * 1000,
  });
  refetch();
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
      {isLoading && <span className="loading loading-spinner"></span>}
      {error && <Error error={"Unexpected error has occurred"} />}
      {data && <TableList posts={data} onDelete={onDelete} />}
    </div>
  );
};

export default AppliedJobList;
