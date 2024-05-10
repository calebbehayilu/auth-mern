import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import JobSeekerValidation from "./validation/jobseeker";
import { useState } from "react";

const JobSeekerFinishup = ({ currentUser, setMessage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: zodResolver(JobSeekerValidation) });
  const onSubmit = async (data) => {
    await apiClient
      .put(`/applied/${currentUser.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
        }
        window.location = "/home";
      })
      .catch((res) => {
        setIsLoading(false);
        setMessage(res.response.data);
      });
  };
  return (
    <div>
      <form
        className="flex flex-col w-96 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <select
          {...register("experienceLevel")}
          className="select select-bordered"
          placeholder="Experience Level"
        >
          <option disabled defaultValue selected>
            Experience Level
          </option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>

        <select
          {...register("educationLevel")}
          className="select select-bordered"
          placeholder="educationLevel"
        >
          <option disabled selected>
            Education Level
          </option>
          <option value="high_school_1_8">High School (Grades 1-8)</option>
          <option value="high_school_9_12">High School (Grades 9-12)</option>
          <option value="associate_degree">Associate Degree</option>
          <option value="bachelor_degree">Bachelor's Degree</option>
          <option value="master_degree">Master's Degree</option>
          <option value="doctorate">Doctorate</option>
        </select>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            +251
            <input
              {...register("phonenumber", { valueAsNumber: true })}
              type="number"
              className="grow"
              placeholder="Phone Number"
            />
          </label>

          {errors.phonenumber && (
            <span className="text-error">{errors.phonenumber.message}</span>
          )}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("workCategory")}
              type="text"
              className="grow"
              placeholder="Work Category"
            />
          </label>
          {errors.workCategory && (
            <span className="text-error">{errors.workCategory.message}</span>
          )}
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          placeholder="Upload CV"
        />
        <div>
          <textarea
            {...register("additional")}
            name="additional"
            className="textarea textarea-bordered w-full h-28"
            placeholder="Additional Note"
          ></textarea>
          {errors.additional && (
            <span className="text-error">{errors.additional.message}</span>
          )}
        </div>
        <button
          className="btn btn-primary text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>Submit</>
          )}
        </button>
      </form>
    </div>
  );
};

export default JobSeekerFinishup;
