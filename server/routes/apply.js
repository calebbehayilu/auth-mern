const express = require("express");
const { Posts } = require("../Models/Posts");
const auth = require("../middleware/auth");
const jobSeeker = require("../middleware/jobSeeker");
const { JobApplier } = require("../Models/Appliers");
const route = express();

route.use(express.json());

route.get("/", [auth], async (req, res) => {
  const applies = await JobApplier.find()
    .populate("userId", ["-password"])
    .populate("postId");

  res.json(applies);
});

route.post("/:postId", [auth, jobSeeker], async (req, res) => {
  const postId = req.params.postId;

  const post = await Posts.findById(postId);
  if (!post) return res.status(404).send("Post not found");
  if (post.questions.length !== Object.keys(req.body.answers).length) {
    return res
      .status(404)
      .send("Number of questions and answers must be equal");
  }
  let answers = post.questions.map((question, i) => ({
    question: question,
    answer: req.body.answers[i],
  }));

  const apply = new JobApplier({
    userId: req.user.id,
    postId: postId,
    answers: answers,
  });

  const result = await apply.save();
  res.send(result);
});

module.exports = route;
