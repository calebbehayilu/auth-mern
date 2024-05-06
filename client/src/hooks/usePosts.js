import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const usePosts = (page, pageSize) => {
  let query = { page, pageSize };
  return useQuery({
    queryKey: ["posts", query],
    queryFn: () =>
      apiClient
        .get(`/posts`, {
          params: {
            page: query.page,
          },
        })
        .then((res) => {
          return res.data;
        }),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export default usePosts;
