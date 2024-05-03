const mongoose = require("mongoose");
const Joi = require("joi");

const EmployerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  companyName: {
    type: String,
  },
  posts: {
    type: Array,
  },
});

const Employer = mongoose.model("Employer", EmployerSchema);
function validateEmployer(employer) {
  const schema = Joi.object({
    companyName: Joi.string().min(1).required(),
    posts: Joi.object(),
  });

  return schema.validate(employer);
}

module.exports = { Employer, validateEmployer };
