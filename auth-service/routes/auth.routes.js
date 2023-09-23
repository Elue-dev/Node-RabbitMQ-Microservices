const express = require("express");
const { registerUser, signinUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", signinUser);

module.exports = router;
