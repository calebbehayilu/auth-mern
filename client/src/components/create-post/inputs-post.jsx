import React from "react";

const InputsPost = () => {
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <div className="">
        <h1 className="text-2xl text-center m-2">CreatePost</h1>
        <form action="" className="pb-2 grid grid-cols-4 gap-5 m-5">
          <span className="col-span-2 gap-2">
            <div className="my-3">
              <label htmlFor="" className="m-2 text-lg py-3">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Web Developer"
                className="input input-bordered w-full "
              />
            </div>
            <div className="my-3">
              <label htmlFor="" className="m-2 text-lg py-3">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="$80"
                className="input input-bordered w-full "
              />
            </div>
            <div className="my-3">
              <label htmlFor="" className="m-2 text-lg py-3">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                placeholder="Tags eg : Fullstack, React"
                className="input input-bordered w-full "
              />
            </div>
            <div className="my-3">
              <label htmlFor="" className="m-2 text-lg py-3">
                Skill Types
              </label>
              <input
                type="text"
                name="skill-types"
                placeholder="Skill Types"
                className="input input-bordered w-full "
              />
            </div>

            <select className="select select-bordered w-full my-3 ">
              <option disabled selected>
                Project Type
              </option>
              <option>One Time</option>
              <option>Contract</option>
              <option>Contract</option>
            </select>
          </span>
          <span className="col-span-2 gap-2">
            <div className="my-3">
              <label htmlFor="" className="m-2 text-lg py-3">
                Region or Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="input input-bordered w-full "
              />
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default InputsPost;
