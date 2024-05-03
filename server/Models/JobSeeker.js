const mongoose = require("mongoose");
const Joi = require("joi");

// Define Mongoose schema
const jobSeekerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  resumeData: { type: String },
  resumeLink: { type: String },
  appliedJobs: { type: Array },
  phoneNumber: { type: String },
  experience: { type: Array },
  education: { type: String },
});

// Define JOI schema for validation

// Function to validate data using JOI schema
function validateJobSeeker(jobSeeker) {
  const jobSeekerValidationSchema = Joi.object({
    resumeData: Joi.string().required(),
    resumeLink: Joi.string().required(),
    appliedJobs: Joi.string(),
    phoneNumber: Joi.number().required(),
    experience: Joi.string().required(),
    education: Joi.string().required(),
  });
  return jobSeekerValidationSchema.validate(jobSeeker);
}

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);

module.exports = {
  JobSeeker,
  validateJobSeeker,
};
