const Course = require('../models/Courses.model'); //models
const { mongoosetoObject } = require('../../util/mongoose');
const { multipleMongoosetoObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /courses
    index(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('courses/courses', {
                    course: multipleMongoosetoObject(course),
                });
            })
            .catch(next);
    }
    // [GET]/courses/:slug
    showCourse(req, res, next) {
        Course.findOne({ slug: req.params.slug }) // xác định slug truyền vào
            .then((course) => {
                res.render('courses/show-course', {
                    course: mongoosetoObject(course),
                });
            })
            .catch(next);
    }
    // [GET]/courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // post dữ liệu mới tạo vào db
    // [POST]/courses/store
    storedCourses(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    // [GET]/courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/update', {
                    course: mongoosetoObject(course),
                }),
            )
            .catch(next);
    }

    // put dữ liệu đã đc update vào db
    // [PUT]/courses/:id/
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //khôi phục dữ liệu
    // [PATCH]/courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // sử dụng thư viện moogose-delete để xóa mềm
    //[DELETE]/courses/:id/
    delete(req, res, next) {
        Course.delete({ _id: req.params.id }) // truyền vào id của khóa học
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE]/courses/:id/force // xóa cứng
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [POST]/courses/handle-form-actions // select all checkbox
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.CourseIds } }) // xóa tất cả thằng nào có id nằm trong CourseIds
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.CourseIds } }) // khôi phục tất cả thằng nào có id nằm trong CourseIds
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action Invalid!' });
        }
    }
}
module.exports = new CourseController();
