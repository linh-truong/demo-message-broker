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

amqp.connect('amqp://rabbitmq:rabbitmq@demo-rabbitmq:5672', function (err, conn) {
    conn.createChannel(function (err, channel) {
        const queueName = 'demo-queue';
        channel.assertQueue(queueName, { durable: false });
        setInterval(()=>{
            channel.sendToQueue(queueName, new Buffer(`Message ${new Date()}`));
        }, 10000)
    });
});