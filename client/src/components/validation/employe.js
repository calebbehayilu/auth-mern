import { z } from "zod";

const EmployerValidation = z.object({
  companyName: z.string().min(3).max(50),
  companyCategory: z.string().min(3).max(50),
  phonenumber: z.number().min(9),
  website: z.string().optional(),
  additional: z.string().max(500).optional(),
});

export default EmployerValidation;
