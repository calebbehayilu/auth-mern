import React from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";

const SelectInput = ({ name, label, options }) => {
  const { control } = useForm();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select className="select select-bordered" {...field}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default SelectInput;
