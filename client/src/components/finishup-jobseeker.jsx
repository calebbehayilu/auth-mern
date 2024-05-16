import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import JobSeekerValidation from "./validation/jobseeker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";

const JobSeekerFinishup = ({ currentUser, setMessage }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: zodResolver(JobSeekerValidation) });

  const onSubmit = async (data) => {
    setIsLoading(true);
    let file;
    if (data.file) {
      file = data?.file[0];
    }
    if (data.workCategory && data.workCategory.includes(",")) {
      data.workCategory = data.workCategory
        .split(",")
        .map((category) => category.trim());
    }
    if (file) {
      const storageRef = ref(storage, `testing/${currentUser.id}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setIsLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            if (downloadUrl) {
              let post = { ...data, resumeData: downloadUrl };
              delete post.file;

              await apiClient
                .put(`/applied/${currentUser.id}`, post)
                .then((res) => {
                  if (res.status === 200) {
                    setIsLoading(false);
                  }
                  navigate("/home");
                })
                .catch((res) => {
                  setIsLoading(false);
                  setMessage(res.response.data);
                });
            }
            setIsLoading(false);
          });
        }
      );
      return;
    }
    await apiClient
      .put(`/applied/${currentUser.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
        }
        navigate("/home");
      })
      .catch((res) => {
        setIsLoading(false);
        setMessage(res.response.data);
      });
  };
  return (
    <div>
      {error && <Error error={"Unexpected error occured"} />}
      <form
        className="flex flex-col w-full sm:w-96 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <select
          {...register("experienceLevel")}
          className="select select-bordered"
          placeholder="Experience Level"
          defaultValue
        >
          <option>Experience Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>

        <select
          {...register("educationLevel")}
          className="select select-bordered"
          placeholder="educationLevel"
          defaultValue
        >
          <option>Education Level</option>
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
              {...register("phoneNumber")}
              type="number"
              className="grow"
              placeholder="Phone Number"
            />
          </label>

          {errors.phoneNumber && (
            <span className="text-error">{errors.phoneNumber.message}</span>
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
        <div>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            placeholder="Upload CV"
            {...register("file")}
          />

          {errors.file && (
            <span className="text-error">{errors.file.message}</span>
          )}
        </div>
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
