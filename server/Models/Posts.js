const mongoose = require("mongoose");
const { User } = require("./Users");
const Joi = require("joi");

const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    min: 10,
  },
  skills: {
    type: Array,
  },
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
  jobDuration: {
    type: String,
  },
  location: {
    type: String,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  experienceLevel: {
    type: String,
  },
  additional: {
    type: String,
  },
  jobType: {
    type: String,
  },
  questions: {
    type: Array,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  applies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

function validatePost(posts) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    skills: Joi.array().min(1).max(50).required(),
    description: Joi.string().min(10).required(),
    tags: Joi.array().min(1).required(),
    jobDuration: Joi.string().min(1).required(),
    minAmount: Joi.number().min(1).required(),
    maxAmount: Joi.number().min(1),
    location: Joi.string().min(1).required(),
    additional: Joi.string().min(5),
    experienceLevel: Joi.string().min(1),
    jobType: Joi.string().min(1),
    questions: Joi.array().min(1).max(50),
  });

  return schema.validate(posts);
}

const Posts = mongoose.model("Posts", PostsSchema);

exports.Posts = Posts;
exports.validatePost = validatePost;
