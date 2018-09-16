const amqp = require("amqplib/callback_api");
var Kafka = require("no-kafka");
const express = require("express");

let rabbitMQMessages = [];
let kafkaMessages = [];

const app = express();
app.get("/rabbitmq", (req, res) => {
  return res.json({
    name: "Node 2",
    data: rabbitMQMessages
  });
});
app.get("/kafka", (req, res) => {
  return res.json({
    name: "Node 2",
    data: kafkaMessages
  });
});
app.listen(3002, () => console.log("Node 2 listening on port 3002!"));

// RabbitMQ
amqp.connect(
  "amqp://rabbitmq:rabbitmq@localhost:5672",
  function (err, conn) {
    conn.createChannel(function (err, channel) {
      const queueName = "demo-queue";
      channel.assertQueue(queueName, { durable: false });
      channel.consume(queueName, message => {
        rabbitMQMessages.push(message);
        console.log('Received RabbitMQ message');
      });
    });
  }
);

// Kafka
const consumer = new Kafka.SimpleConsumer({
  connectionString: "localhost:9092"
});
consumer.init().then(function () {
  // Subscribe partitions 0 in a topic:
  consumer.subscribe("demo-topic", [0], (messageSet, topic, partition) => {
    kafkaMessages.push.apply(kafkaMessages, messageSet);
    console.log('Received Kafka message');
  });
});
