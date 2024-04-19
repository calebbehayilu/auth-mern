import React from "react";

const RadioButtons = ({ title }) => {
  return (
    <label className="flex items-center gap-5 py-1 cursor-pointer ">
      <input
        type="radio"
        name="radio-10"
        className="radio radio-sm checked:bg-red-500"
      />
      <span className="text-md">{title}</span>
    </label>
  );
};

export default RadioButtons;
