const Product = require("../models/product.model");
const { getChannel } = require("../rabbitMQ/publisher");

exports.createProduct = async function (req, res) {
  try {
    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      creatorId: req.user.id,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json("Server Error", error);
  }
};

exports.buyProduct = async function (req, res) {
  try {
    const { ids } = req.body;
    const channel = getChannel();

    if (!channel) {
      return res.status(500).json("RabbitMQ channel is not available.");
    }

    const products = await Product.find({ _id: { $in: ids } });

    channel.sendToQueue(
      "ORDER",
      Buffer.from(
        JSON.stringify({
          products,
          userId: req.user.id,
        })
      )
    );

    let orderFromQueue;
    channel.consume("PRODUCT", (data) => {
      orderFromQueue = JSON.parse(data.content);
      console.log({ orderFromQueue });
      channel.ack(data);
    });

    setTimeout(() => res.status(201).json(orderFromQueue), 2000);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
