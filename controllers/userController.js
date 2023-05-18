const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");



function genHassPass(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

async function generateSecreteKey() {
  return crypto.randomBytes(64).toString("hex");
}

function generateAccessToken(userdata, key) {
  return jwt.sign(userdata, key, {
    expiresIn: "30d",
  });
}

const Signup = async (req, res) => {
  let { name, email, phone, password, cpassword } = req.body;
  let existUser;

  //removing white space
  email = email.trim();
  password = password.trim();
  cpassword = cpassword.trim();
  phone = phone.trim();
  
  //validation for the bad request
  if (!name || !email || !phone || !password || !confirm_password) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }
  //email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format." });
  }
  try {
    existUser = await User.findOne({ email });
    if (existUser)
      return res.json({ sucess: false, message: "user with email exists!." });

    if (password !== cpassword)
      return res.json({ sucess: false, message: "passwords do not match!" });

    let hashPass = genHassPass(password);

    let user = new User({
      name,
      email,
      phone,
      password: hashPass,

    });
    let result = await user.save();
    result
      ? res.status(201).json({ sucess: true, message: "user created successfully!" })
      : res.json({ sucess: fasle, message: "unable to create a user." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", error: error });
  }
};

const Login = async (req, res) => {
  let { email, password } = req.body;
  let user;

  //white space remove
  email = email.trim();
  password = password.trim();

   //validation for the bad request
   if (!email || !password) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }
  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format." });
  }

  // Validate email and password presence
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }
  try {
    user = await User.findOne({ email });
    if (!user)
      return res.json({
        sucess: false,
        message: "user with email does not exist.",
      });

    let isPassCorrect = bcrypt.compareSync(password, user.password);
    if (!isPassCorrect)
      return res.json({
        sucess: false,
        message: "username or password incorrect",
      });

    const userdata = {
      userId: user._id,
      username: user.email,
    };
    const accessToken = generateAccessToken(userdata, process.env.SECRETE_KEY);
    

    res.json({ success: true, message:"Login successfull!.",userId: user._id, accessToken: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", error: error });
  }
};

//login using passport

async function passportLogin(req,res){

}

module.exports = { Signup, Login };
