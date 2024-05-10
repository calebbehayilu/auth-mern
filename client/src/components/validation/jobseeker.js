import { z } from "zod";

const JobSeekerValidation = z.object({
  experienceLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  educationLevel: z.enum([
    "high_school_1_8",
    "high_school_9_12",
    "associate_degree",
    "bachelor_degree",
    "master_degree",
    "doctorate",
  ]),
  phonenumber: z.number().min(3),
  workCategory: z.string().min(3).max(50),
  additional: z.string().max(500),
});

export default JobSeekerValidation;
