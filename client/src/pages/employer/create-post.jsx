import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Inputs from "../../components/input";
import { BiTrash } from "react-icons/bi";
import apiClient from "../../services/api-client";
const countries = [
  "Afar",
  "Amhara",
  "Benishangul",
  "Gambella",
  "Harari",
  "Oromia",
  "Somali",
  "Tigray",
  "SNNPR",
];
const schema = z.object({
  title: z.string().min(3),
  skills: z.string().min(3),
  location: z.string().min(3),
  minAmount: z.number().min(1),
  maxAmount: z.number().min(1),
  experienceLevel: z.string().min(3),
  description: z.string().min(3),
  jobType: z.string().min(3),
  additional: z.string().min(3),
  jobDuration: z.string().min(3),
  questions: z.string().min(3),
});
const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(schema) });
  const [questions, setQuestion] = useState([]);

  const handleRemove = (index) => {
    const newArray = questions.filter((q, i) => i !== index);

    setQuestion(newArray);
  };
  const handleAddQuestion = () => {
    setQuestion((prevArray) => [...prevArray, getValues("questions")]);
  };

  const getSkills = (skills) => {
    let testdata = "day ,night , mid day";
    let newArray = testdata.split(",");

    return newArray;
  };
  const onSubmit = async (data) => {
    const post = {
      ...data,
      skills: getSkills(data.skills),
      questions,
    };
    await apiClient
      .post("/posts", {
        ...post,
        tags: ["new ", "not so new", "old"],
      })
      .then((res) => console.log(res));
  };
  return (
    <div className="flex flex-col justify-center items-center mb-3">
      <div className=" mx-5 md:w-8/12 lg:w-6/12">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="collapse collapse-arrow bg-base-200 mb-5">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">Post</div>
            <div className="collapse-content">
              <Inputs
                type="text"
                title="Job Title"
                register={register}
                name="title"
                placeholder="Facebook ad specialist needed for product launch"
                error={errors.title}
              />
              <div className="my-3">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Location
                </label>
                <select
                  {...register("location")}
                  className="select select-bordered w-full"
                >
                  <option disabled defaultValue>
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
              <Inputs
                type="text"
                title="Skills"
                register={register}
                name="skills"
                placeholder="Web Developer, UI/UX, JS"
                error={errors.skills}
              />
              <Inputs
                type="text"
                title="Experience Level"
                register={register}
                name="experienceLevel"
                placeholder="Degree"
                error={errors.experienceLevel}
              />
              <div className="my-3 ">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Budget
                </label>
                <div className="flex mx-4 w-6/12">
                  <Inputs
                    type="number"
                    title="Min"
                    register={register}
                    name="minAmount"
                    placeholder="$20"
                    error={errors.minAmount}
                    valueAsNumber
                  />
                  <div className="w-26 mx-5 "></div>
                  <Inputs
                    type="number"
                    title="Max"
                    register={register}
                    name="maxAmount"
                    placeholder="$200"
                    error={errors.maxAmount}
                    valueAsNumber
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 mb-5">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Job Detail</div>
            <div className="collapse-content">
              <Inputs
                type="text"
                title="Job Type"
                register={register}
                name="jobType"
                placeholder="Remote"
                error={errors.jobType}
              />
              <Inputs
                type="text"
                title="Job Duration"
                register={register}
                name="jobDuration"
                placeholder="Month"
                error={errors.jobDuration}
              />
              <Inputs
                type="text"
                title="Additional"
                register={register}
                name="additional"
                placeholder="$200"
                error={errors.additional}
              />

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
                {errors.description && (
                  <span className="text-error">
                    {errors.description.message}
                  </span>
                )}
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
              <span
                className="badge badge-secondary cursor-pointer hover:badge-secondary"
                onClick={() => handleAddQuestion()}
              >
                + Add Question
              </span>
              {questions && (
                <section className="p-2 ">
                  {questions.map((question, index) => (
                    <div key={index} className="py-2 flex justify-between  ">
                      <p>
                        {index + 1}. {question}
                      </p>
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          handleRemove(index);
                        }}
                      >
                        <BiTrash className="text-error" size={20} />
                      </span>
                    </div>
                  ))}
                </section>
              )}
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

export default CreatePost;
