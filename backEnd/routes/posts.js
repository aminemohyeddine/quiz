const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  const user = await User.findOne({ _id: decoded._id });
  if (!user) return res.send("user get error");
  res.send(user);
  console.log(user);
});

router.get("/p", async (req, res) => {
  const userr = await User.updateOne(
    {
      lastName: "dededded",
    },
    { score: [{ haha: "2/4" }] }
  );
  console.log(userr);
});

module.exports = router;
