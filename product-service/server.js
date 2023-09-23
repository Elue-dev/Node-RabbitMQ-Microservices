const express = require("express");
const mongoose = require("mongoose");
const { connectToQueue } = require("./rabbitMQ/publisher");
require("dotenv").config();
const productRouter = require("./routes/product.routes");

const app = express();
const PORT = process.env.PORT || 7070;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () =>
    console.log(`Product Service running at port ${PORT}`)
  );
  console.log("Product Service Database Connected");
});

connectToQueue();

app.use("/api/products", productRouter);
