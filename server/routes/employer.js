const express = require("express");
const auth = require("../middleware/auth");
const { JobApplier } = require("../Models/Appliers");
const { Employer } = require("../Models/Employer");
const route = express();

route.use(express.json());

route.get("/", [auth], async (req, res) => {
  const applied = await Employer.find({ userId: req.user.id }).populate(
    "posts"
  );
  if (!applied) return res.status(404).send("You haven`t posted any jobs.");

  res.json(applied);
});
route.get("/:appliedId", [auth], async (req, res) => {
  const appliedId = req.params.appliedId;

  const applies = await JobApplier.find({ postId: appliedId })
    .populate("userId", ["-password"])
    .populate("postId");

  res.json(applies);
});

route.delete("/:appliedId", auth, async (req, res) => {
  const appliedId = req.params.appliedId;

  const applied = await JobApplier.findOne({
    _id: appliedId,
  });

  if (!applied) return res.status(404).send("Post not found.");

  const result = await JobApplier.findByIdAndDelete(appliedId);

  res.status(200).send(result);
});
route.put("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const employer = await Employer.findOne({ userId: userId });

  const user = await Employer.findByIdAndUpdate(employer._id, {
    companyName: req.body.companyName,
    componyCategory: req.body.companyCategory,
    phoneNumber: req.body.phoneNumber,
    website: req.body.website,
    additional: req.body.additional,
  });
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});
module.exports = route;
