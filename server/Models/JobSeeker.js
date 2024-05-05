const mongoose = require("mongoose");
const Joi = require("joi");

const jobSeekerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  resumeData: { type: String },
  resumeLink: { type: String },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobApplier" }],
  phoneNumber: { type: Number },
  experience: { type: Array },
  education: { type: String },
});

function validateJobSeeker(jobSeeker) {
  const jobSeekerValidationSchema = Joi.object({
    resumeData: Joi.string().required(),
    resumeLink: Joi.string().required(),
    appliedJobs: Joi.array(),
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
