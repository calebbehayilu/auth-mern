import { useEffect, useState } from "react";
import FormsSideBar from "./sidebar/forms-sidebar";
import { Controller, useForm } from "react-hook-form";
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

const Sidebar = ({ setLocation, refetch }) => {
  const { register, watch, getValues, control } = useForm();

  const selectedLocation = watch("location") || "All";

  useEffect(() => {
    setLocation(selectedLocation);
    refetch();
  }, [selectedLocation]);

  return (
    <div className="hidden lg:flex flex-col bg-base-100 rounded-lg">
      <h1 className="text-xl px-4 pt-4">Filters</h1>
      <div className="px-6 py-3">
        <h1 className="text-xl">Location</h1>
        {/* <FormsSideBar /> */}
        <Controller
          control={control}
          name="location"
          defaultValue=""
          render={({ field }) => (
            <select
              className="select select-bordered w-full max-w-xs"
              {...field}
            >
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
