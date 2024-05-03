const mongoose = require("mongoose");
const Joi = require("joi");

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
});

function validateCity(city) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(city);
}

const City = mongoose.model("City", CitySchema);

module.exports = { City, validateCity };
