var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World, This is Shubham Sharma')
});

app.listen(3000);