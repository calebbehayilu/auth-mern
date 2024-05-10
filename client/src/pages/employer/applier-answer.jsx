import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api-client";
import ApplierCard from "./components/applier-card";

const ApplierAnswer = () => {
  const params = useParams();
  const retrievePosts = async () => {
    const response = await apiClient.get(`/apply/${params.applerId}`);
    return response.data;
  };
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["appler_answer"],
    queryFn: retrievePosts,
  });

  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="text-2xl font-semibold m-3">Applier Application</h1>
      {data && (
        <div className="flex justify-center">
          <ApplierCard applierDetail={data} />
        </div>
      )}
    </div>
  );
};

export default ApplierAnswer;
