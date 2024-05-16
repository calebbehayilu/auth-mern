const mongoose = require("mongoose");

const Joi = require("joi");

const ContactSchema = new mongoose.Schema({
  email: { type: String },
  subject: { type: String },
  message: {
    type: String,
  },
});

function validateContact() {
  const schema = Joi.object({
    email: Joi.string().email().min(2).max(50).required(),
  });
}

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = { Contact, validateContact };
