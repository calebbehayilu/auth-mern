import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Inputs from "../../components/input";
import { BiTrash } from "react-icons/bi";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import Error from "./../../components/error";
const countries = [
  "All",
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
const jobType = [
  "Permanent/Full-time",
  "Temporary",
  "Contract",
  "Part-time",
  "Internship",
  "Freelance",
  "Consulting",
  "Probationary",
  "Seasonal",
  "On-call",
  "Other",
];
const schema = z.object({
  title: z.string().min(3),
  skills: z.string().min(3),
  location: z.string().min(1),
  minAmount: z.number().min(1),
  maxAmount: z.number().min(1),
  experienceLevel: z.string().min(3),
  description: z.string().min(3),
  jobType: z.string().min(3),
  additional: z.string().min(3),
  questions: z.string({
    invalid_type_error: "You Have to add the question ",
    required_error: "required field",
  }),
});
const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [questions, setQuestion] = useState([]);
  const navigate = useNavigate();

  const handleRemove = (index) => {
    const newArray = questions.filter((q, i) => i !== index);

    setQuestion(newArray);
  };
  const handleAddQuestion = () => {
    if (getValues("questions") == "") {
      return setError("Can`t add empty question");
    }
    setError("");
    setQuestion((prevArray) => [...prevArray, getValues("questions")]);
  };

  const getSkills = (skills) => {
    let testdata = "day ,night , mid day";
    let newArray = testdata.split(",");

    return newArray;
  };
  const onSubmit = async (data) => {
    setIsLoading(true);

    if (getValues("questions") !== "") {
      setQuestion((prevArray) => [...prevArray, getValues("questions")]);
    }

    const post = {
      ...data,
      skills: getSkills(data.skills),
      questions,
    };

    const res = await apiClient
      .post("/posts", {
        ...post,
        tags: ["new ", "not so new", "old"],
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((res) => {
        setIsLoading(false);
        setError(res.response.data);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center mb-3">
      <div className=" mx-5 md:w-8/12 lg:w-6/12">
        {error && <Error error={error} />}
        <form action="" className="mt-3" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="md:flex mx-4 w-6/12">
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
              <div className="my-3">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Job Type
                </label>
                <select
                  {...register("jobType")}
                  className="select select-bordered w-full"
                >
                  <option disabled defaultValue>
                    Pick A Job Type
                  </option>
                  {jobType.map((jobtype) => (
                    <option value={jobtype} key={jobtype}>
                      {jobtype}
                    </option>
                  ))}
                </select>
              </div>

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
                {errors.questions && (
                  <span className="text-error">{errors.questions.message}</span>
                )}
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

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary w-full"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <h1>Post</h1>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
