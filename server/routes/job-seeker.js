const express = require("express");
const auth = require("../middleware/auth");
const { JobApplier } = require("../Models/Appliers");
const { JobSeeker } = require("../Models/JobSeeker");
const route = express();

route.use(express.json());

route.get("/", [auth], async (req, res) => {
  const applied = await JobApplier.find({ userId: req.user.id }).populate(
    "postId"
  );
  if (!applied) return res.status(404).send("You haven`t applied to any jobs.");

  res.json(applied);
});

route.delete("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;

  // delete from applied jobs
  const post = await JobApplier.findOneAndDelete({
    postId: postId,
  });
  if (!post) return res.send("Post not found");

  // remove from jobseekers applied jobs array
  await JobSeeker.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { appliedJobs: post._id } },
    { new: true }
  );
  res.status(200).send(post);
});
module.exports = route;
