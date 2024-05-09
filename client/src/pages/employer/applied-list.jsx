import { useParams } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import AppliedCard from "./components/applied-card";
import Error from "../../components/error";

const AppledList = () => {
  const params = useParams();

  const { data, isLoading, error } = useUsers(params.appliedId);
  return (
    <div className="flex flex-col justify-center items-center  m-5">
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
          <div className="md:w-6/12  overflow-x-auto rounded-lg">
            {data.map((applier) => (
              <AppliedCard applier={applier} key={applier._id} />
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
