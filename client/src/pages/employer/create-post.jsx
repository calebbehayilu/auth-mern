import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Inputs from "../../components/input";
import { BiTrash } from "react-icons/bi";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import Error from "./../../components/error";
import Select from "react-select";
import { clsx } from "clsx";

const controlStyles = {
  base: "input input-bordered text-base-100",
  focus: "",
  nonFocus: "border hover:border-gray-100",
};
const placeholderStyles = "text-slate-500 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
  "bg-primary rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  " bg-base hover:bg-red-50 hover:text-red-800 text-base-300 hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const indicatorSeparatorStyles = "";
const clearIndicatorStyles =
  "text-gray-100 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const dropdownIndicatorStyles =
  "p-1 bg-base-200 rounded hover:bg-base-300 text-slate-500 overflow-y-auto";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-base rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-base-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded menu bg-base-100",
  focus: "bg-base-200 active:bg-base-200 border",
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-base-100",
};
const noOptionsMessageStyles =
  "text-gray-100 p-2 bg-base-200 border border-dashed border-base-200 rounded-sm";
const countries = [
  { value: "All", label: "All" },
  { value: "Afar", label: "Afar" },
  { value: "Amhara", label: "Amhara" },
  { value: "Benishangul", label: "Benishangul" },
  { value: "Gambella", label: "Gambella" },
  { value: "Harari", label: "Harari" },
  { value: "Oromia", label: "Oromia" },
  { value: "Somali", label: "Somali" },
  { value: "Tigray", label: "Tigray" },
  { value: "SNNPR", label: "SNNPR" },
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
  title: z
    .string({
      message: "Title Can`t be empty ",
    })
    .min(3),
  skills: z
    .string({
      message: "Skills Can`t be empty ",
    })
    .min(3)
    .refine(
      (value) => {
        return value.includes(",");
      },
      {
        message: "The string must include at least one comma (,)",
      }
    ),
  location: z.string().array().min(1),
  minAmount: z
    .number({
      invalid_type_error: "Must be number",
      message: "Budget Can`t be empty ",
    })
    .min(1),
  maxAmount: z
    .number({
      invalid_type_error: "Must be number",
      message: "Budget Can`t be empty ",
    })
    .min(1),
  experienceLevel: z
    .string({
      message: "Experience Level Can`t be empty ",
    })
    .min(3),
  description: z
    .string({
      message: "Description Can`t be empty ",
    })
    .min(3),
  jobType: z
    .string({
      message: "Job Type Can`t be empty ",
    })
    .min(3),
  additional: z.string().optional(),
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
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

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
    if (skills.includes(",")) {
      let newArray = skills.split(",");

      return newArray;
    }
    return skills;
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    if (getValues("questions") == "") {
      setError("Quesion is Required ");
    }
    if (getValues("questions") !== "") {
      setQuestion((prevArray) => [...prevArray, getValues("questions")]);
    }

    const post = {
      ...data,
      skills: getSkills(data.skills),
      questions,
      tags: getSkills(data.skills),
    };
    await apiClient
      .post("/posts", {
        ...post,
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
    <div className="md:flex flex-col justify-center items-center mb-3">
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
                <Controller
                  control={control}
                  name={"location"}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      options={countries}
                      value={countries.find((c) => c.value == value)}
                      onChange={(val) => onChange(val.map((c) => c.value))}
                      isMulti={true}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      unstyled
                      className="w-full h-fit"
                      classNames={{
                        control: ({ isFocused }) =>
                          clsx(
                            isFocused
                              ? controlStyles.focus
                              : controlStyles.nonFocus,
                            controlStyles.base
                          ),
                        placeholder: () => placeholderStyles,
                        input: () => selectInputStyles,
                        valueContainer: () => valueContainerStyles,
                        singleValue: () => singleValueStyles,
                        multiValue: () => multiValueStyles,
                        multiValueLabel: () => multiValueLabelStyles,
                        multiValueRemove: () => multiValueRemoveStyles,
                        indicatorsContainer: () => indicatorsContainerStyles,
                        clearIndicator: () => clearIndicatorStyles,
                        indicatorSeparator: () => indicatorSeparatorStyles,
                        dropdownIndicator: () => dropdownIndicatorStyles,
                        menu: () => menuStyles,
                        groupHeading: () => groupHeadingStyles,
                        option: ({ isFocused, isSelected }) =>
                          clsx(
                            isFocused && optionStyles.focus,
                            isSelected && optionStyles.selected,
                            optionStyles.base
                          ),
                        noOptionsMessage: () => noOptionsMessageStyles,
                      }}
                    />
                  )}
                />

                {errors.location && (
                  <span className="text-error">{errors.location.message}</span>
                )}
              </div>
              <Inputs
                type="text"
                title="Tags"
                register={register}
                name="skills"
                placeholder="Web Developer, UI/UX, JS"
                error={errors.skills}
              />

              <div className="my-3">
                <label htmlFor="" className="m-2 my-4 text-lg py-3">
                  Experience Level
                </label>
                <select
                  {...register("experienceLevel")}
                  className="select select-bordered w-full"
                  defaultValue={""}
                >
                  <option value={""} disabled>
                    Experience Level
                  </option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

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
                title="Additional Note"
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
              Questionnaire
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
