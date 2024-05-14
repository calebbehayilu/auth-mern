const express = require("express");
const route = express();
const { User } = require("../Models/Users");
const auth = require("../middleware/auth");
const { _ } = require("lodash");
const { Posts, validatePost } = require("../Models/Posts");
const employer = require("../middleware/employer");
const { Employer } = require("../Models/Employer");
const { JobApplier } = require("../Models/Appliers");
const { JobSeeker } = require("../Models/JobSeeker");
const { Notification } = require("../Models/Notification");

route.use(express.json());
const locations = [
  "All",
  "Afar",
  "Amhara",
  "Benishangul",
  "Gambella",
  "Harari",
  "Oromia",
  "Somali",
  "Tigray",
  "SNNPR",
  "Other",
];
route.get("/", async (req, res) => {
  // /?page=1&pageSize=10
  // /?location=${location}
  // /?search=${words}
  const page = req.query.page || 1;
  const search = req.query.search || "";
  const pageSize = 10;
  let location = req.query.location || "All";
  location === "All"
    ? (location = [...locations])
    : (location = req.query.location.slice(","));

  let posts = await Posts.find({
    title: { $regex: search, $options: "i" },
    active: true,
  })
    .populate("userId", ["-password"])
    .where("location")
    .in(location)
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

// * accepting a request
route.put("/accept/:appliedId", auth, async (req, res) => {
  const appliedId = req.params.appliedId;

  const applied = await JobApplier.findByIdAndUpdate(appliedId, req.body);
  if (!applied) return res.send("Application not found");
  const notification = new Notification({
    userId: applied.userId,
    postId: applied.postId,
    type: "ACCEPTED",
    fromId: req.user.id,
    appliedId: applied._id,
  });

  await notification.save();
  res.send(applied);
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
  const appliedId = await JobApplier.find({ postId: postId });

  await Posts.findByIdAndDelete(postId);
  await JobApplier.deleteMany({ postId: postId });

  // ! code should get fixed
  const deletion = await JobSeeker.updateOne(
    [...appliedId],
    { $pull: { appliedJobs: appliedId._id } },
    { new: true }
  );
  console.log(deletion, appliedId);
  res.status(200).send(true);
});

module.exports = route;
