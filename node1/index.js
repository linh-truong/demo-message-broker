const express = require('express');
const app = express();

const messages = []

app.get('/', (req, res) => {
    return res.json({
        name:'Node 1',
        data: messages
    })
});

app.listen(3001, () => console.log('Node 1 listening on port 3001!'));