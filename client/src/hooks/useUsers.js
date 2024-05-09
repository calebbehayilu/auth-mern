import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const useUsers = (appliedId) => {
  return useQuery({
    queryKey: ["appliersList"],
    queryFn: () =>
      apiClient.get(`/employer/${appliedId}`).then((res) => {
        return res.data;
      }),
  });
};

export default useUsers;
