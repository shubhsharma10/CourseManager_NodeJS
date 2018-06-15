var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
    name: String,
    seats: Number,
    maxSeats: Number,
    courseId: Number
},{collections: 'section'});

module.exports = sectionSchema;