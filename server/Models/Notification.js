const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  fromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  appliedId: { type: mongoose.Schema.Types.ObjectId, ref: "jobapplier" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  isRead: { type: Boolean, default: false },
  type: { type: String, enum: ["ACCEPTED", "REQESTED", "POSTED"] },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { Notification };
