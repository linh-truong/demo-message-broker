const express = require('express');
const app = express();

const messages = []

app.get('/', (req, res) => {
    return res.json({
        name:'Node 2',
        data: messages
    })
});

app.listen(3002, () => console.log('Node 2 listening on port 3002!'));