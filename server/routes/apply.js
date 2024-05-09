const express = require("express");
const { Posts } = require("../Models/Posts");
const auth = require("../middleware/auth");
const jobSeeker = require("../middleware/jobSeeker");
const { JobApplier } = require("../Models/Appliers");
const { JobSeeker } = require("../Models/JobSeeker");
const route = express();

route.use(express.json());

route.get("/", [auth], async (req, res) => {
  const applies = await JobApplier.find()
    .populate("userId", ["-password"])
    .populate("postId");

  res.json(applies);
});
route.get("/:appliedId", [auth], async (req, res) => {
  const appliedId = req.params.appliedId;

  const applies = await JobApplier.findById(appliedId)
    .populate("userId", ["-password"])
    .populate("postId");

  res.json(applies);
});
// ! This Get /:userId  is a testing

route.get("/:userId", [auth], async (req, res) => {
  const userId = req.params.userId;

  const applies = await JobApplier.findOne({
    userId: userId,
  })
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

  await JobSeeker.findOneAndUpdate(
    { userId: req.user.id },
    { $push: { appliedJobs: result._id } },
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

  res.send(result);
});

module.exports = route;
