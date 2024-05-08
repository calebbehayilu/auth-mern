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

      <div className="flex justify-center  w-full">
        {error && (
          <div className="mx-10 my-5">
            <Error error={error.message} />
          </div>
        )}
        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}

        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}

        {data ? (
          <div className="w-6/12  overflow-x-auto rounded-lg">
            {data.map((applier) => (
              <AppliedCard applier={applier} key={applier._id} />
            ))}
          </div>
        ) : (
          <p> There are no any appliers.</p>
        )}
      </div>
    </div>
  );
};

export default AppledList;
