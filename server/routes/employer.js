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

route.delete("/:appliedId", auth, async (req, res) => {
  const appliedId = req.params.appliedId;

  const applied = await JobApplier.findOne({
    _id: appliedId,
  });

  if (!applied) return res.status(404).send("Post not found.");

  const result = await JobApplier.findByIdAndDelete(appliedId);

  res.status(200).send(result);
});

module.exports = route;
