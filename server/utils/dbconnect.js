const mongoose = require("mongoose");

async function connect(url) {
  await mongoose
    .connect(url || process.env.MONGODB_URL)
    .then(() => {
      console.log(`MongoDB Connected . . . ${url}`);
    })
    .catch((err) => {
      console.log("Catch ERROR : ", err);
    });
}

module.exports.connect = connect;
