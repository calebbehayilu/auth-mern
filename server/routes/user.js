const jwt = require("jsonwebtoken");
const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const { User } = require("./../Models/Users");
const auth = require("../middleware/auth");
const { validateUser } = require("../Models/Users");
const { Employer } = require("../Models/Employer");
const { JobSeeker } = require("../Models/JobSeeker");
const { Admin } = require("../Models/Admin");
const { JobApplier } = require("../Models/Appliers");
const { Posts } = require("../Models/Posts");
route.use(express.json());

route.get("/all", async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10;

  const search = req.query.search || "";

  const user = await User.find()
    .select("-password")
    .skip((page - 1) * pageSize)
    .limit(pageSize);

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

  const { error } = validateUser(body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: body.email });
  if (user) return res.status(400).send("Email already exists");

  user = User(body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const user_res = await user.save();
  await CreateUserByRole(user_res);
  const token = await generateToken(user);

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

route.put("/:userId", async (req, res) => {
  const userId = req.params.userId;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findByIdAndUpdate(userId, req.body);
  if (!user) return res.status(404).send("User not found");

  const newUser = await User.findById(userId);
  await CreateUserByRole(newUser);

  const token = await generateToken(newUser);

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

route.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByIdAndDelete(userId);
  if (!user) return res.status(404).send("user not found");

  // check role
  try {
    if (user.role == "job_seeker") {
      await JobApplier.deleteMany({ userId: user._id });
      await JobSeeker.deleteOne({ userId: user._id });
      await User.findByIdAndDelete(user._id);
    }

    // if employer clean posts
    if (user.role == "employer") {
      await Posts.deleteMany({ userId: user._id });
      await Employer.deleteOne({ userId: user._id });
      await User.findByIdAndDelete(user._id);
    }
  } catch (err) {
    return res.status(501).send("Server error occured");
  }
  // if jobseeker clean jobapplications

  res.status(200).send(true);
});

async function CreateUserByRole(user_res) {
  let newUser;
  switch (user_res.role) {
    case "employer":
      newUser = new Employer({
        userId: user_res._id,
      });
      break;
    case "job_seeker":
      newUser = new JobSeeker({
        userId: user_res._id,
      });
      break;
    case "admin":
      newUser = new Admin({
        userId: user_res._id,
      });
      break;

    default:
      throw new Error("Invalid role input");
  }

  const result = await newUser.save();

  return result;
}

async function generateToken(user) {
  const token = jwt.sign(
    { id: user._id, user: user.name, role: user.role },
    process.env.JWT_KEY
  );
  return token;
}

module.exports = route;
module.exports.generateToken = generateToken;
