const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    creatorId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", productSchema);
