const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const { connect } = require("./utils/dbconnect");
const user = require("./routes/user");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const apply = require("./routes/apply");
const applied = require("./routes/job-seeker");
const employer = require("./routes/employer");
const app = express();
require("dotenv").config();

console.log(`app: ${app.get("env")}`);

app.use(cors());
app.use(helmet());
app.use(express.json());

if (app.get("env") === "development") {
  app.use(morgan("common"));
}

connect();

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/user", user);
app.use("/auth", auth);
app.use("/posts", posts);
app.use("/apply", apply);
app.use("/applied", applied);
app.use("/employer", employer);

app.listen(3000, () => {
  console.log(`connected to 3000`);
});
