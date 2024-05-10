const express = require("express");
const auth = require("../middleware/auth");
const { Notification } = require("../Models/Notification");

const route = express();

route.get("/", auth, async (req, res) => {
  const notification = await Notification.find({ userId: req.user.id })
    .populate("fromId", ["name"])
    .populate("postId", ["title"])
    .sort({ date: 1 });

  res.send(notification);
});
route.get("/unread", auth, async (req, res) => {
  const notification = await Notification.find({
    userId: req.user.id,
    isRead: false,
  });

  if (notification.length == 0) return res.send(false);

  res.send(true);
});

route.put("/:notificationId", auth, async (req, res) => {
  const notificationId = req.params.notificationId;

  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    req.body
  );
  if (!notification) return res.status(404).send("Notification not found");

  res.send(true);
});
module.exports = route;
