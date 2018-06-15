var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    userType: {type: String, default: 'Student'},  // "Admin" or "Student"
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber:String,
    address:String
}, {collection: 'user'});

module.exports = userSchema;