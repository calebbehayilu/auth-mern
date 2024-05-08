import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const useUsers = (appliedId) => {
  return useQuery({
    queryKey: ["appliersList"],
    queryFn: () =>
      apiClient.get(`/employer/${appliedId}`).then((res) => {
        return res.data;
      }),
    staleTime: 1 * 60 * 1000,
  });
};

export default useUsers;
