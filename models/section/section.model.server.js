var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel',sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId:courseId});
}

function decrementSectionSeat(sectionId) {
    return sectionModel.update({_id: sectionId}, {
        $inc: {seats: -1}
    })
}

function incrementSectionSeat(sectionId) {
    return sectionModel.update({_id: sectionId}, {
        $inc: {seats: 1}
    })
}

module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeat: decrementSectionSeat,
    incrementSectionSeat: incrementSectionSeat
};