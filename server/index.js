const helmet = require("helmet");
const morgan = require("morgan");
const startupDebug = require("debug")("app:startup");
const dbDebug = require("debug")("app:db");
const express = require("express");
const cors = require("cors");
const { connect } = require("./utils/dbconnect");
const user = require("./routes/user");
const auth = require("./routes/auth");
const app = express();
require("dotenv").config();
let mongo_url;

console.log(`app: ${app.get("env")}`);

app.use(cors());
app.use(helmet());
app.use(express.json());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  mongo_url = process.env.MONGODB_URL_LOCAL;

  startupDebug("Morgan enabled...");
}

connect(mongo_url);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/user", user);
app.use("/auth", auth);

app.listen(3001, () => {
  console.log(`connected to 3000`);
});
