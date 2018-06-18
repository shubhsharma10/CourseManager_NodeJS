var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.serve');

var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment)
}

function cancelErollmentForAllInSection(sectionId) {
    return enrollmentModel.deleteMany({section: sectionId});
}

function cancelStudentEnrollmentInSection(enrollment) {
    return enrollmentModel.findOne({section: enrollment.section, student: enrollment.student})
        .exec()
        .then(function (enrollment) {
            return enrollment.remove();
        })
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    cancelStudentEnrollmentInSection: cancelStudentEnrollmentInSection,
    cancelErollmentForAllInSection: cancelErollmentForAllInSection
};