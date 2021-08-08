const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const questionsRouter = require("./routes/questions");
//import Routes
const authRoute = require("./routes/Auth");
const postRoute = require("./routes/posts");
const devRoute = require("./routes/deveRoutes");
const gameHandlerRoute = require("./routes/gameHandler");

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

app.listen(3001, () => {
  console.log("server started at port 3001");
});
