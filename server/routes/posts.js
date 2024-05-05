const express = require("express");
const route = express();
const { User } = require("../Models/Users");
const auth = require("../middleware/auth");
const { _ } = require("lodash");
const { Posts, validatePost } = require("../Models/Posts");
const employer = require("../middleware/employer");

route.use(express.json());

route.get("/", async (req, res) => {
  let posts = await Posts.find().populate("userId", ["-password"]);

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
