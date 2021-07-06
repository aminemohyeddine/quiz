const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
//import Routes
const authRoute = require("./routes/Auth");
const postRoute = require("./routes/posts");

mongoose.connect(
  process.env.APP_MONGO_DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },

  () => {
    console.log("connected to db");
  }
);

// middleWears
app.use(express.json());
app.use(cors());
// route middleWears postRoute
app.use("/user", authRoute);
app.use("/posts", postRoute);

app.listen(3001, () => {
  console.log("server started at port 3001");
});
