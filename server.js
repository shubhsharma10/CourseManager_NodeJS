var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
mongoose.connect('mongodb://test1234:test1234@ds259070.mlab.com:59070/cs5610-summer1-ssharma');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send('Hello World, This is Shubham Sharma')
});

require('./services/user.service.server')(app);

app.listen(PORT);