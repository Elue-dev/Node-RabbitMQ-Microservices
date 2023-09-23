const amqp = require("amqplib");

let channel, connection;
const connectToQueue = async function () {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
    console.log("Connected to RabbitMQ Server");
  } catch (error) {
    console.error("Error connecting to RabbitMQ Server:", error.message);
  }
};

function getChannel() {
  return channel;
}

module.exports = { connectToQueue, getChannel };
