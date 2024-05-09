const express = require("express");
const route = express();
const { User } = require("../Models/Users");
const auth = require("../middleware/auth");
const { _ } = require("lodash");
const { Posts, validatePost } = require("../Models/Posts");
const employer = require("../middleware/employer");
const { Employer } = require("../Models/Employer");

route.use(express.json());

route.get("/", async (req, res) => {
  // /?page=1&pageSize=10
  const page = req.query.page || 1;
  const pageSize = 10;

  let posts = await Posts.find({
    active: true,
  })
    .populate("userId", ["-password"])
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.send(posts);
});
route.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  const post = await Posts.findById(postId).populate("userId", ["-password"]);
  if (!post) return res.status(404).send("Post not found.");

  res.status(200).send(post);
});

route.post("/", [auth, employer], async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.user.id });
  if (!user) return res.status(404).send("User Not found");

  const todo = _.pick(req.body, [
    "title",
    "skills",
    "description",
    "tags",
    "minAmount",
    "maxAmount",
    "userId",
    "experienceLevel",
    "location",
    "additional",
    "jobType",
    "questions",
    "active",
  ]);
  const post = new Posts({
    title: todo.title,
    skills: todo.skills,
    description: todo.description,
    tags: todo.tags,
    minAmount: todo.minAmount,
    maxAmount: todo.maxAmount,
    userId: req.user.id,
    location: todo.location,
    experienceLevel: todo.experienceLevel,
    additional: todo.additional,
    jobType: todo.jobType,
    questions: todo.questions,
  });

  const response = await post.save();
  await Employer.findOneAndUpdate(
    { userId: req.user.id },
    { $push: { posts: response._id } },
    { new: true }
  )
    .then((updatedJobSeeker) => {
      if (!updatedJobSeeker) {
        throw new Error("JobSeeker not found");
      }
    })
    .catch((error) => {
      return res.status(404).send(error);
    });
  res.send(response);
});
route.put("/:postId", [auth, employer], async (req, res) => {
  const postId = req.params.postId;

  const post = await Posts.findByIdAndUpdate(postId, req.body);
  if (!post) return res.status(404).send("Post not found");

  res.send(true);
});

route.delete("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;

  const post = await Posts.findOne({
    _id: postId,
  });
  if (!post) return res.status(404).send("Post not found.");

  if (post.userId.toString() !== req.user.id) {
    return res.status(401).send("Unauthorized.");
  }
  const result = await Posts.findByIdAndDelete(postId);
  res.status(200).send(result);
});

module.exports = route;
