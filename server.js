var express = require('express');
const PORT = process.env.PORT;

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World, This is Shubham Sharma')
});

app.listen(PORT);