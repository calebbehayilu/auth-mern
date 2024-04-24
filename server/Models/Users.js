const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  uid: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employer", "job_seeker"],
  },
  birthDate: {
    type: Date,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports.User = User;
