import { useNavigate } from "react-router-dom";
import React from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Sidebar from "./sidebar";
import { MdClose } from "react-icons/md";

const drawerClose =
  "fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto -translate-x-full bg-white w-80 dark:bg-base-200";
const drawerOpen =
  "fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform w-96 bg-base-100 border-r";

export default function Drawer({ children, isOpen, setIsOpen }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const getClasses = () => {
    let classes;
    classes += isOpen ? drawerOpen : drawerClose;

    return classes;
  };

  if (!isOpen) return null;
  return (
    <div className="">
      <div id="drawer-example" className={drawerOpen}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <MdClose size={28} />
          <span className="sr-only">Close menu</span>
        </button>

        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400"></p>
        <div className="">
          <form
            action=""
            className="flex mx-5"
            onSubmit={handleSubmit((data) => {
              navigate(`?search=${data.search}`);
              setIsOpen(false);
            })}
          >
            <label className="input input-bordered  flex justify-around mx-2 ">
              <input
                {...register("search")}
                type="text"
                className="grow"
                placeholder="Search"
              />
            </label>
            <button className="btn btn-accent m-0" type="submit">
              <BiSearch />
            </button>
          </form>
          <Sidebar setIsOpen={setIsOpen} />
        </div>
        <div className="grid grid-cols-2 gap-4"></div>
      </div>
    </div>
  );
}
