const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const questionsRouter = require("./routes/questions");
const path = require("path");
//import Routes
const authRoute = require("./routes/Auth");
const postRoute = require("./routes/posts");
const devRoute = require("./routes/deveRoutes");
const gameHandlerRoute = require("./routes/gameHandler");
const adminAuthRoute = require("./routes/adminAuth");

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
mongoose.set("useFindAndModify", false);

// route middleWears postRoute
app.use("/user", authRoute);
app.use("/", questionsRouter);
app.use("/posts", postRoute);
app.use("/dev", devRoute);
app.use("/gamedata", gameHandlerRoute);
app.use("/", adminAuthRoute);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder to serve
  app.use(express.static(__dirname + "../build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
  });
}

app.listen(3001, () => {
  console.log("server started at port 3001");
});
