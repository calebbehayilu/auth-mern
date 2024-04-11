import RadioButtons from "./radio-buttons";
import React from "react";
const countries = [
  {
    id: 1,
    name: "Addis Ababa", // Already Ethiopian
  },
  {
    id: 2,
    name: "Gondar",
  },
  {
    id: 3,
    name: "Bahir Dar",
  },
  {
    id: 4,
    name: "Dire Dawa",
  },
];

const FormsSideBar = () => {
  return (
    <form action="form-control p-5" className="p-2 w-full">
      <RadioButtons title="All" />
      {countries.map((countrie) => (
        <RadioButtons title={countrie.name} key={countrie.id} />
      ))}
    </form>
  );
};

export default FormsSideBar;
