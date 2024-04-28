import React from "react";

const OldPostUi = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-3">
      <div className=" mx-5 md:w-8/12 lg:w-6/12">
        <form action="" onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="collapse collapse-arrow bg-base-200 mb-5">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">Post</div>
            <div className="collapse-content">
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Job Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  placeholder="Facebook ad specialist needed for product launch"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="my-3">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Location
                </label>
                <select
                  {...register("location")}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Pick Job Location
                  </option>
                  <option value="All">All</option>
                  {countries.map((countrie) => (
                    <option value={countrie} key={countrie}>
                      {countrie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Skills
                </label>
                <input
                  {...register("skills")}
                  type="text"
                  name="skills"
                  placeholder="Web Developer, UI/UX, JS "
                  className="input input-bordered w-full "
                />
              </div>
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Experience Level
                </label>
                <input
                  {...register("experienceLevel")}
                  type="text"
                  name="experienceLevel"
                  placeholder="Degree"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Budget
                </label>
                <div className="flex mx-4 w-6/12">
                  <div>
                    <label htmlFor="" className="text-md mx-3 my-2">
                      Min
                    </label>
                    <input
                      {...register("minAmount")}
                      type="number"
                      name="minAmount"
                      placeholder="$20"
                      className="input input-bordered w-full "
                    />
                  </div>
                  <div className="w-26 mx-5 "></div>
                  <div>
                    <label htmlFor="" className="text-md mx-3 ">
                      Max
                    </label>
                    <input
                      {...register("maxAmount")}
                      type="number"
                      name="maxAmount"
                      placeholder="$200"
                      className="input input-bordered w-full "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 mb-5">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Job Detail</div>
            <div className="collapse-content">
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Job Type
                </label>
                <input
                  {...register("jobType")}
                  type="text"
                  name="jobType"
                  placeholder="Remote"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Additional
                </label>
                <input
                  {...register("additional")}
                  type="text"
                  name="additional"
                  placeholder="Web Developer"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Work Duration
                </label>
                <input
                  {...register("workDuration")}
                  type="text"
                  name="workDuration"
                  placeholder="Month"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  name="description"
                  className="textarea textarea-bordered w-full h-28"
                  placeholder="Bio"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 mb-5">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Questionnaire (Optional)
            </div>
            <div className="collapse-content">
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Question
                </label>
                <input
                  {...register("questions")}
                  type="text"
                  name="questions"
                  placeholder="What is your last job?"
                  className="input input-bordered w-full "
                />
              </div>

              <button
                className="badge badge-outline "
                onClick={() => handleAddQuestion()}
              >
                + Add Questions
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default OldPostUi;
