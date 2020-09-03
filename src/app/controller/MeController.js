const Course = require('../models/Courses.model'); //models
const { multipleMongoosetoObject } = require('../../util/mongoose');

class MeController {
    // [GET]/me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()]) // bất đồng bộ trong js
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongoosetoObject(courses),
                });
            })
            .catch(next);
    }
    // [GET]/me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: multipleMongoosetoObject(courses),
                });
            })
            .catch(next);
    }
    // [GET]/me/stored/news
}
module.exports = new MeController();
