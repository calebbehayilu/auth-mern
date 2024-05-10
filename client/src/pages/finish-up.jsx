import { useState } from "react";
import { getCurrentUser } from "../utils/auth";
import { Link } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import EmployerFinishup from "../components/finishup-employer";
import JobSeekerFinishup from "../components/finishup-jobseeker";

const FinishUp = () => {
  const currentUser = getCurrentUser();
  const [message, setMessage] = useState();
  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1 className="text-2xl m-2">Finish Up</h1>
        {message && (
          <div role="alert" className="my-3 max-w-96 alert alert-success">
            <BiCheckCircle size={22} />
            <span>{message}</span>
            <Link to={"/home"} className="link mr-2">
              Home
            </Link>
          </div>
        )}
        {currentUser.role == "job_seeker" ? (
          <JobSeekerFinishup
            currentUser={currentUser}
            setMessage={setMessage}
          />
        ) : (
          <EmployerFinishup currentUser={currentUser} setMessage={setMessage} />
        )}
      </div>
    </div>
  );
};

export default FinishUp;
