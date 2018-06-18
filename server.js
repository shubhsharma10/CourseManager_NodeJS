var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
mongoose.connect('mongodb://test1234:test1234@ds259070.mlab.com:59070/cs5610-summer1-ssharma');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:4200',
                    'https://cs5610-summer1-angular-ssharma.herokuapp.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1800 * 1000
    },
    rolling: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send('Hello World, This is Shubham Sharma')
});

require('./services/user.service.server')(app);
require('./services/section.service.server')(app);
app.listen(PORT);