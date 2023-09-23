const express = require("express");
const {
  createProduct,
  buyProduct,
} = require("../controllers/product.controller");
const { verifyAuth } = require("../../verifyAuth");

const router = express.Router();

router.route("/").post(verifyAuth, createProduct);
router.route("/buy").post(verifyAuth, buyProduct);

module.exports = router;
