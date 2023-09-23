const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const orderRouter = require("./routes/order.route");
const { connectToQueue, getChannel } = require("./rabbitMQ/publisher");
const { createOrder } = require("./jobs/create.order");

const app = express();
const PORT = process.env.PORT || 9090;
app.use(express.json());

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Order Service Database Connected");

    app.listen(PORT, () =>
      console.log(`Order Service running at port ${PORT}`)
    );
  } catch (error) {
    console.error("Error:", error);
  }
})();

connectToQueue().then(() => {
  const channel = getChannel();
  channel.consume("ORDER", async (data) => {
    const { products, userEmail } = JSON.parse(data.content);
    try {
      const newOrder = await createOrder(products, userEmail);
      channel.sendToQueue("PRODUCT", Buffer.from(JSON.stringify({ newOrder })));
      channel.ack(data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  });
});

app.use("/api/orders", orderRouter);
