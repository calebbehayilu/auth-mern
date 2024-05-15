import { useParams } from "react-router-dom";
import useFetch from "./../../utils/useFetch";
import Error from "./../../components/error";
import JobDetailCard from "./job-detail-card";

const JobDetail = () => {
  const { postId } = useParams();
  const { isPending, error, data: post } = useFetch(`/posts/${postId}`);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-semibold text-2xl">Job Detail</h1>
      {error && <Error error={error.message} />}
      {isPending && (
        <div className="flex flex-col justify-center items-center m-5">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {post && (
        <div className="mt-5 m-2">
          <JobDetailCard post={post} />
        </div>
      )}
    </div>
  );
};

export default JobDetail;
