const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("./../Models/Users");
const { generateToken } = require("./user");

route.use(express.json());

route.post("/", async (req, res) => {
  const body = req.body;

  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: body.email });
  if (!user) return res.status(404).send("Incorrect Email or Password");

  const password = await bcrypt.compare(body.password, user.password);
  if (!password) return res.status(404).send("Incorrect Email or Password");

  const token = await generateToken(user);

  console.log(_.omit(user, ["password", "name"]));
  res
    .status(200)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

function validate(body) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(6)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .max(30)
      .required(),
  });
  return schema.validate(body);
}

module.exports = route;
