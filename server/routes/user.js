const jwt = require("jsonwebtoken");
const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("./../Models/Users");
const auth = require("../middleware/auth");

route.use(express.json());

route.get("/all", async (req, res) => {
  const data = req.user;

  const user = await User.find().select("-password");
  res.send(user);
});

route.get("/me", auth, async (req, res) => {
  const data = req.user;
  const user = await User.findOne({ _id: data.id }).select("-password");
  res.send(user);
});

route.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) return res.status(404).send("User not found");

  res.send(user);
});

route.post("/signUp-with-google", async (req, res) => {
  const body = await req.body;

  let user = await User.findOne({ email: body.email, uid: body.uid });
  if (!user) {
    user = User(body);
    await user.save();

    const token = await generateToken(user);

    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(user);
  }

  const token = await generateToken(user);

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

route.post("/", async (req, res) => {
  const body = await req.body;

  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: body.email });
  if (user) return res.status(400).send("Email already exists");

  user = User(body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = await generateToken(user);
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

route.put("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const salt = await bcrypt.genSalt(10);
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const user = await User.findByIdAndUpdate(userId, req.body);

  if (!user) return res.status(404).send("User not found");

  res.send(user);
});

route.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByIdAndDelete(userId);
  if (!user) return res.status(404).send("user not found");

  res.status(200).send(true);
});

async function generateToken(user) {
  const token = jwt.sign(
    { id: user._id, user: user.name },
    process.env.JWT_KEY
  );
  return token;
}

function validate(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(6)
      .max(30),
    password: Joi.string().min(6).max(30).required(),
    uid: Joi.string().min(3),
  });

  return schema.validate(body);
}

module.exports = route;
module.exports.generateToken = generateToken;
