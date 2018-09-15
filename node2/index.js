const amqp = require('amqplib/callback_api');
const express = require('express');
const app = express();

const messages = []

app.get('/', (req, res) => {
    return res.json({
        data: messages
    })
});

app.listen(3000, () => console.log('Node listening on port 3000!'));

amqp.connect(process.env.RABBITMQ_URI, function (err, conn) {
    conn.createChannel(function (err, channel) {
        const queueName = 'demo-queue';
        channel.assertQueue(queueName, { durable: false });
        channel.consume(queueName, message => {
            messages.push(message);
        })
    });
});