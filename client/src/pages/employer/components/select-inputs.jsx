import { Button } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
i;
const Food = () => {
  const { handleSubmit, control } = useForm();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div>
      <form
        action=""
        className=""
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Food;
