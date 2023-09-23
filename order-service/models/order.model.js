const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: Array,
    user: String,
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", orderSchema);
