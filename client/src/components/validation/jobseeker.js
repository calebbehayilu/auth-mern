import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "docx", "jpeg"];

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
  phoneNumber: z.coerce.string(),
  workCategory: z.string().min(3).max(50),
  additional: z.string().max(500),
  file: z
    .any()
    .optional()
    .refine((file) => {
      return !file[0] || file[0].size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return !file[0] || ACCEPTED_FILE_TYPES.includes(file[0].type);
    }, "File must be a PDF,Docx or JPEG"),
});

export default JobSeekerValidation;
