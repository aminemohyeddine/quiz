const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require("dotenv").config();

router.post("/register", async (req, res) => {
  //validate data
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //check if there is similar mail
  const sameEmail = await User.findOne({ email: req.body.email });
  if (sameEmail) return res.send("mail already in our database !");
  console.log("same mail");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new User
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
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

router.post("/login", async (req, res) => {
  //validate data with joi
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //check if mail is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("email is wrong");

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("password is wrong");

  //create tokenKey
  let finalData = {};
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "50min",
  });
  finalData = { token: token, login: true, currentUser: user };
  res.header("auth-token", token).send(finalData);
});

module.exports = router;
