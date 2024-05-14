const mongoose = require("mongoose");
const Joi = require("joi");

const jobDurations = [
  "Permanent/Full-time",
  "Temporary",
  "Contract",
  "Part-time",
  "Internship",
  "Freelance",
  "Consulting",
  "Probationary",
  "Seasonal",
  "On-call",
  "Other",
];
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
const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    min: 10,
  },
  skills: [String],
  description: {
    type: String,
    require: true,
    min: 15,
  },
  tags: {
    type: Array,
  },
  postDate: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: Array,
  },
  minAmount: Number,
  maxAmount: Number,
  experienceLevel: String,
  jobType: {
    type: String,
    enum: jobDurations,
  },
  questions: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  applies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

function validatePost(posts) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    skills: Joi.array().min(1).max(50).required(),
    description: Joi.string().min(10).required(),
    tags: Joi.array().min(1).required(),
    minAmount: Joi.number().min(1).required(),
    maxAmount: Joi.number().min(1),
    location: Joi.array().required(),
    additional: Joi.string().min(5),
    experienceLevel: Joi.string().min(1),
    jobType: Joi.string().valid(...jobDurations),
    questions: Joi.array().min(1).max(50),
    active: Joi.boolean(),
  });

  return schema.validate(posts);
}

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = { Posts, validatePost };
