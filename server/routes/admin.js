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
route.get("/posts", async (req, res) => {
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
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { skills: { $regex: search, $options: "i" } },
    ],
  })
    .populate("userId", ["-password"])
    .where("location")
    .in(location)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.send(posts);
});
module.exports = route;
