import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const usePosts = (page, pageSize, location, search) => {
  let query = { page, pageSize };

  return useQuery({
    queryKey:
      search != ""
        ? ["posts", query, "search", search, "location", location]
        : ["posts", query, "location", location],
    queryFn: () =>
      apiClient
        .get(`/posts`, {
          params: {
            page: query.page,
            location,
            search,
          },
        })
        .then((res) => {
          return res.data;
        }),
    staleTime: 1 * 60 * 1000,
  });
};

export default usePosts;
