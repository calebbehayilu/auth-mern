import { useParams } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import AppliedCard from "./components/applied-card";
import Error from "../../components/error";
import apiClient from "../../services/api-client";

const AppledList = () => {
  const params = useParams();
  // /accept/:appliedId
  const { data, isLoading, error, refetch } = useUsers(params.appliedId);

  const onAccept = async (id, isAccepted) => {
    await apiClient
      .put(`/posts/accept/${id}`, { isAccepted: !isAccepted })
      .then((res) => {
        refetch();
      });
  };
  return (
    <div className="flex flex-col justify-center items-center m-5 h-screen">
      <h1 className="text-2xl font-semibold m-3">Appliers List</h1>

      <div className="md:flex justify-center w-full">
        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        {error && (
          <div className="mx-10 my-5">
            <Error error={error.message} />
          </div>
        )}
        {data && (
          <div className="sm:w-8/12 overflow-x-auto rounded-lg">
            {data.map((applier) => (
              <AppliedCard
                applier={applier}
                key={applier._id}
                onAccept={onAccept}
              />
            ))}
            {data == "" && (
              <h1 className="text-warning text-3xl text-center font-semibold m-5">
                There are No Appliers
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppledList;
