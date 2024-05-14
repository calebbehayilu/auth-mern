import { useEffect, useState } from "react";
import FormsSideBar from "./sidebar/forms-sidebar";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  "Other",
];

const Sidebar = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const { control } = useForm();

  return (
    <div className="flex flex-col bg-base-100 rounded-lg">
      <h1 className="text-xl px-4 pt-4">Filters</h1>
      <div className="px-6 py-3">
        <h1 className="text-md md:text-xl ">Location</h1>
        {/* <FormsSideBar /> */}
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <select
              className="select select-bordered w-4/5 md:w-full md:max-w-xs"
              onChange={(e) => {
                let Val = "All";
                Val = e.target.value;
                onChange(Val);
                navigate(`?location=${Val}`);
                setIsOpen(false);
              }}
            >
              <option>Select a Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    </div>
  );
};

export default Sidebar;
