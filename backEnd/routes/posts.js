const router = require("express").Router();
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  res.send("you can access to the posts");
});

module.exports = router;
