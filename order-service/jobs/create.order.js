const Order = require("../models/order.model");

exports.createOrder = async function (products, userId) {
  let totalPrice = 0;
  products.map((product) => (totalPrice += product.price));

  const newOrder = new Order({
    products,
    user: userId,
    totalPrice,
  });

  await newOrder.save();

  return newOrder;
};
