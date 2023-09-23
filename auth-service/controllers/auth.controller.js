const User = require("../models/user.model");
const JWT = require("jsonwebtoken");

exports.registerUser = async function (req, res) {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json("user already exists");

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Server Error", error);
  }
};

exports.signinUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Invalid credentials provided");
    if (password !== user.password)
      return res.status(400).json("Invalid credentials provided");
    const payload = {
      id: user.id,
      username: user.username,
      email,
    };

    const currentUser = user._doc;
    const token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ ...currentUser, token });
  } catch (error) {
    res.status(500).json("Server Error", error);
  }
};
