const jwt = require("jsonwebtoken");
const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../Models/Users");
const auth = require("../middleware/auth");

route.use(express.json());

route.get("/", (req, res) => {
  return "get";
});

route.post("/", (req, res) => {
  return "post";
});
route.patch("/", (req, res) => {
  return "patch";
});
route.delete("/", (req, res) => {
  return "delete";
});
module.exports = route;
