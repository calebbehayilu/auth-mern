const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  uid: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employer", "job_seeker"],
  },
  birthdate: {
    type: Date,
  },
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(6)
      .max(30),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().valid("admin", "employer", "job_seeker").required(),
    birthdate: Joi.date().less(Date.now()),
    uid: Joi.string().min(3),
  });

  return schema.validate(user);
}
const User = mongoose.model("users", UserSchema);

exports.User = User;
module.exports.validateUser = validateUser;
