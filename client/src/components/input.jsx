import React from "react";

const Inputs = ({
  name,
  title,
  register,
  type,
  placeholder,
  error,
  valueAsNumber,
  value,
  onChange,
}) => {
  return (
    <div className="my-3 ">
      <label htmlFor="" className="m-2 my-4 text-lg py-3">
        {title}
      </label>
      <input
        {...register(name, { valueAsNumber })}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
      {error && <span className="text-error">{error.message}</span>}
    </div>
  );
};

export default Inputs;
