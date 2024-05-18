const mongoose = require("mongoose");
const Joi = require("joi");

const adminSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  removedUsers: {
    type: [String],
    default: [],
  },
  removedPosts: {
    type: [String],
    default: [],
  },
  removedMessages: {
    type: [String],
    default: [],
  },
});

const Admin = mongoose.model("Admin", adminSchema);

const adminValidationSchema = Joi.object({
  userId: Joi.string().required(),
  removedUsers: Joi.array().items(Joi.string()),
  removedPosts: Joi.array().items(Joi.string()),
});

module.exports = { Admin, adminValidationSchema };
