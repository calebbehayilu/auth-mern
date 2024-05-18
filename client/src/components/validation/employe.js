import { z } from "zod";

const EmployerValidation = z.object({
  companyName: z.string().optional(),
  companyCategory: z
    .string({
      message: "Company Category Level Can`t be empty ",
    })
    .min(3)
    .max(50)
    .refine(
      (value) => {
        return value.includes(",");
      },
      {
        message: "The string must include at least one comma (,)",
      }
    ),
  phonenumber: z.coerce.string(),
  website: z.string().optional(),
  additional: z.string().max(500).optional(),
});

export default EmployerValidation;
