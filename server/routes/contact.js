const express = require("express");
const { Contact } = require("../Models/Contact");
const route = express();

route.use(express.json());

route.post("/", async (req, res) => {
  const body = await req.body;

  const message = Contact(body);

  const result = await message.save();

  res.send(result);
});

module.exports = route;
