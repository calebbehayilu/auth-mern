import React from "react";
import { useQuery } from "@tanstack/react-query";

import apiClient from "../../services/api-client";
import TableList from "./table";
import Error from "../../components/error";

const AppliedJobList = () => {
  const retrievePosts = async () => {
    const response = await apiClient.get(`/applied`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["applied"],
    queryFn: retrievePosts,
    staleTime: 1 * 60 * 1000,
  });

  return (
    <div className="flex flex-col justify-center items-center m-5">
      {isLoading && <span className="loading loading-spinner"></span>}
      {error && <Error error={"Unexpected error has occurred"} />}
      {data && <TableList posts={data} />}
    </div>
  );
};

export default AppliedJobList;
