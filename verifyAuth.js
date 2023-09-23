const JWT = require("jsonwebtoken");
const User = require("./auth-service/models/user.model");

exports.verifyAuth = async function (req, res, next) {
  let token;
  const headers = req.headers.authorization;

  if (headers && headers.startsWith("Bearer")) {
    token = headers.split(" ")[1];
  }

  if (!token)
    return res
      .status(401)
      .json("You are not logged in. Please log in to get access");

  try {
    JWT.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return console.log(error);
      req.user = user;
    });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json("Session expired. Please log in again");
  }
  next();
};
