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

// * get single user
route.get("/:userId", auth, async (req, res) => {
  const userId = req.params.userId;

  const user = await JobSeeker.findOne({ userId: userId });
  if (!user) return res.status(404).send("User Not Found.");

  res.json(user);
});

// * deleting an applied job
route.delete("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;

  // * delete from applied jobs
  const post = await JobApplier.findOneAndDelete({
    postId: postId,
  });
  if (!post) return res.send("Post not found");

  // * remove from jobseekers applied jobs array
  await JobSeeker.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { appliedJobs: post._id } },
    { new: true }
  );
  res.status(200).send(post);
});

route.put("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const jobSeeker = await JobSeeker.findOne({ userId: userId });

  const user = await JobSeeker.findByIdAndUpdate(jobSeeker._id, {
    resumeData: req.body.resumeData || "",
    resumeLink: "",
    phoneNumber: req.body.phoneNumber,
    experience: req.body.experienceLevel,
    education: req.body.educationLevel,
    workCategory: req.body.workCategory,
    additional: req.body.additional,
  });
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});
module.exports = route;
