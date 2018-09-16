const amqp = require("amqplib/callback_api");
var Kafka = require("no-kafka");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
  return res.json({
    name: "Node 1"
  });
});
app.listen(3001, () => console.log("Node 1 listening on port 3001!"));

// RabbitMQ
amqp.connect(
  "amqp://rabbitmq:rabbitmq@localhost:5672",
  (err, conn) => {
    conn.createChannel(function(err, channel) {
      const queueName = "demo-queue";
      channel.assertQueue(queueName, { durable: false });
      setInterval(() => {
        channel.sendToQueue(queueName, new Buffer(`RabbitMQ ${Date.now()}`));
        console.log('Sent RabbitMQ message')
      }, 10000);
    });
  }
);

Kafka
var producer = new Kafka.Producer({
  connectionString: "localhost:9092"
});
producer.init().then(() => {
  setInterval(() => {
    producer.send({
      topic: "demo-topic",
      partition: 0,
      message: {
        value: `Kafka ${Date.now()}`
      }
    });
    console.log('Sent Kafka message')
  }, 10000);
});
