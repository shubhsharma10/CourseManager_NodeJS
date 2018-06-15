module.exports = function (app) {
    app.post('/api/course/:courseId/section',createSection);
    app.get('/api/course/:courseId/section',findSectionsForCourse);
    // app.post('/api/enroll/section/:sectionId', enrollStudentInSection);
    // app.get('/api/student/section', findSectionsForStudent);
    // app.get('/api/section/:sectionId/student', findStudentsForSection);


    var sectionModel = require('../models/section/section.model.server');


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

};