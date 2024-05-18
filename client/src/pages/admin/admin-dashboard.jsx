import { useNavigate } from "react-router-dom";
import AdminTable from "./components/admin-tables";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  return (
    <div className="flex m-3">
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold m-3">Admin Dashboard</h1>
        <div>
          <form
            action=""
            className="flex "
            onSubmit={handleSubmit((data) => {
              navigate(`?search=${data.search}`);
            })}
          >
            <label className="input input-bordered rounded-2xl flex justify-around ">
              <input
                {...register("search")}
                type="text"
                className="grow"
                placeholder="Search"
              />
            </label>
            <button className="rounded-2xl btn btn-accent mx-2" type="submit">
              <BiSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
