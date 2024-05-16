import { Link, Navigate } from "react-router-dom";
import Footer from "../components/footer";
import { getCurrentUser } from "../utils/auth";
import jobhunt from "./../../public/jobhunt.svg";

const WelcomePage = () => {
  const currentUser = getCurrentUser();

  if (currentUser) return <Navigate to="/home" />;

  return (
    <div className="">
      <div className="px-10 py-5 md:p-10">
        <div className="md:grid grid-cols-2 md:p-10 space-y-10 md:space-y-0">
          <div className="max-w-md">
            <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-300">
              Qitir Tiri ቅጥር ጥሪ
            </h1>
            <p className="py-4 md:text-lg">
              Qitir Tiri is dedicated to empowering your job hunt. We're your
              one-stop shop to navigate the application jungle, craft killer
              resumes, and land your dream career.
            </p>
            <Link to={"/signup"} className="btn btn-outline btn-xl">
              Get started
            </Link>
          </div>
          <div className="flex justify-center place-items-center">
            <img src={jobhunt} width={350} className="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
