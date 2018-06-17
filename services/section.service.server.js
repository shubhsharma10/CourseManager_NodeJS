module.exports = function (app) {
    app.post('/api/course/:courseId/section',createSection);
    app.get('/api/course/:courseId/section',findSectionsForCourse);
    app.get('/api/section/:sectionId',findSectionById);
    app.put('/api/section/:sectionId',updateSection);
    app.delete('/api/section/:sectionId',deleteSection);
    app.post('/api/section/:sectionId/enroll', enrollStudentInSection);
    app.delete('/api/section/:sectionId/enroll',cancelStudentEnrollmentInSection);
    app.get('/api/student/section',findSectionForStudents);
    // app.get('/api/student/section', findSectionsForStudent);
    // app.get('/api/section/:sectionId/student', findStudentsForSection);


    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionById(req, res) {
        var id = req.params['sectionId'];
        sectionModel.findSectionById(id)
            .then(function (section) {
                res.json(section);
            })
    }

    function updateSection(req,res) {
        var sectionId = req.params['sectionId'];
        var newSection = req.body;
        sectionModel.updateSection(sectionId,newSection)
            .then(function (updatedSection) {
                res.json(updatedSection);
            })
            .catch(function(error){
                res.sendStatus(500).send(error);
            });
    }

    function deleteSection(req,res) {
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function(error){
                res.sendStatus(500).send(error);
            });
    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function enrollStudentInSection(req,res) {
        var student = req.session['currentUser'];
        var sectionId = req.params['sectionId'];
        var studentId = student._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };
        sectionModel
            .incrementSectionSeat(sectionId)
            .then(function (result) {
                console.log(result);
                return enrollmentModel.enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            });
    }

    function cancelStudentEnrollmentInSection(req,res) {
        var student = req.session['currentUser'];
        if(student) {
            var sectionId = req.params['sectionId'];
            var studentId = student._id;
            var enrollment = {
                student: studentId,
                section: sectionId
            };
            sectionModel
                .decrementSectionSeat(sectionId)
                .then(function (result) {
                    console.log(result);
                    return enrollmentModel.cancelStudentEnrollmentInSection(enrollment)
                })
                .then(function () {
                    res.sendStatus(200);
                })
                .catch(function (error) {
                    res.sendStatus(500).send(error);
                });
        } else {
            res.sendStatus(500);
        }
    }

    function findSectionForStudents(req,res) {
        var currentUser = req.session['currentUser'];
        if(currentUser) {
            var studentId = currentUser._id;
            enrollmentModel
                .findSectionsForStudent(studentId)
                .then(function (enrollments) {
                    res.json(enrollments)
                })
                .catch(function (error) {
                    res.send(error);
                });
        } else {
            res.sendStatus(500);
        }
    }

};