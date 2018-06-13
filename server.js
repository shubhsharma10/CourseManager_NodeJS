var express = require('express');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://test1234:test1234@ds259070.mlab.com:59070/cs5610-summer1-ssharma');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World, This is Shubham Sharma')
});

// var userModel = require('./models/user/user.model.server');
// userModel.createUser({
//     username: 'bob',
//     password: 'bob'
// });

// userModel.findAllUsers()
//     .then(function(users){
//     console.log(users);
// });
app.listen(PORT);