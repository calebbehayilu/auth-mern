import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const usePosts = () => {
  const retrievePosts = async () => {
    const response = await apiClient.get(`/posts`);
    return response.data;
  };

  return useQuery({
    queryKey: ["posts"],
    queryFn: retrievePosts,
    staleTime: 1 * 60 * 1000,
  });
};

export default usePosts;
