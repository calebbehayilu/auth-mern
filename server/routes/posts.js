const jwt = require("jsonwebtoken");
const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../Models/Users");
const auth = require("../middleware/auth");
const { _ } = require("lodash");
const { Posts, validatePost } = require("../Models/Posts");

route.use(express.json());

route.get("/", async (req, res) => {
  const posts = await Posts.find().populate("userId", ["-password"]);

  res.send(posts);
});
route.get("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;

  const post = await Posts.findById(postId).populate("userId", ["-password"]);
  if (!post) return res.status(404).send("Post not found.");

  res.status(200).send(post);
});

route.post("/", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.user.id });
  if (!user) return res.status(404).send("User Not found");

  const todo = _.pick(req.body, [
    "title",
    "discription",
    "tags",
    "minAmount",
    "maxAmount",
    "jobDuration",
    "userId",
  ]);
  const post = new Posts({
    title: todo.title,
    discription: todo.discription,
    tags: todo.tags,
    minAmount: todo.minAmount,
    maxAmount: todo.maxAmount,
    jobDuration: todo.jobDuration,
    userId: req.user.id,
  });

  const response = await post.save();
  res.send(response);
});
route.put("/:postId", auth, async (req, res) => {
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
