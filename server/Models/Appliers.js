const mongoose = require("mongoose");
const Joi = require("joi");

const JobApplierSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  answers: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
  appliedTime: {
    type: Date,
    default: Date.now(),
  },
});

function validateJobApplier(jobApplier) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    postId: Joi.string().required(),
    answers: Joi.array().items(
      Joi.object({
        question: Joi.string(),
        answer: Joi.string(),
      })
    ),
  });

  return schema.validate(jobApplier);
}

const JobApplier = mongoose.model("JobApplier", JobApplierSchema);

module.exports = { JobApplier, validateJobApplier };
