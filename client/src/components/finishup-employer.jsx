import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import EmployerValidation from "./validation/employe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const EmployerFinishup = ({ currentUser, setMessage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: zodResolver(EmployerValidation) });

  const onSubmit = async (data) => {
    if (data.companyCategory && data.companyCategory.includes(",")) {
      data.companyCategory = data.companyCategory
        .split(",")
        .map((category) => category.trim());
    }
    console.log(data);

    // await apiClient
    //   .put(`/employer/${currentUser.id}`, newData)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setIsLoading(false);
    //     }
    //     // window.location = "/home";
    //   })
    //   .catch((res) => {
    //     setIsLoading(false);
    //     setMessage(res.response.data);
    //   });

    setIsLoading(false);
  };
  return (
    <div>
      <form
        className="flex flex-col w-96 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("companyName")}
              type="text"
              className="grow"
              placeholder="Company"
            />
          </label>
          {errors.companyName && (
            <span className="text-error">{errors.companyName.message}</span>
          )}
        </div>{" "}
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("companyCategory")}
              type="text"
              className="grow"
              placeholder="Company Category"
            />
          </label>
          {errors.companyCategory && (
            <span className="text-error">{errors.companyCategory.message}</span>
          )}
        </div>
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
              {...register("website")}
              type="text"
              className="grow"
              placeholder="Website"
            />
          </label>
          {errors.website && (
            <span className="text-error">{errors.website.message}</span>
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
export default EmployerFinishup;
