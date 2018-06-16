var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel',sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionById(sectionId) {
    return sectionModel.findById(sectionId);
}

function updateSection(sectionId,section) {
    return sectionModel.findByIdAndUpdate(sectionId,section,{new:true})
        .exec()
        .then(function(updatedSection){
            return updatedSection;
        });
}

function deleteSection(sectionId) {
    return sectionModel.findById(sectionId)
        .exec()
        .then(function (section) {
            return section.remove();
        });
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
    incrementSectionSeat: incrementSectionSeat,
    findSectionById: findSectionById,
    updateSection: updateSection,
    deleteSection: deleteSection
};