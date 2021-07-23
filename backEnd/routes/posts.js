const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Questions = require("../model/questions");

const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  const user = await User.findOne({ _id: decoded._id });
  if (!user) return res.send("user get error");
  res.send(user);
  console.log(user);
});

router.post("/question", verify, async (req, res) => {
  const user = new Questions({
    questionText: req.body.questionText,
    answerOptions: [
      {
        answerText1: req.body.questionText1,
        isCorrect1: req.body.isCorrect1,
      },
      {
        answerText2: req.body.questionText2,
        isCorrect2: req.body.isCorrect2,
      },
      {
        answerText3: req.body.questionText3,
        isCorrect3: req.body.isCorrect3,
      },
      {
        answerText4: req.body.questionText4,
        isCorrect4: req.body.isCorrect4,
      },
    ],
  });
  try {
    const savedUser = await user.save();
    let registerData = { message: "user added", userData: savedUser };
    res.send(registerData);
  } catch (err) {
    res.send(err + "in add ");
    console.log("err");
  }
});
module.exports = router;
