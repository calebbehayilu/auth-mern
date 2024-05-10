const express = require("express");
const auth = require("../middleware/auth");

const route = express();

route.get("/", [auth], (req, res) => {
  res.send("this is a test");
});

module.exports = route;
