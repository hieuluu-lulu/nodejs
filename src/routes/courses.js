const express = require('express');
const router = express.Router();

const coursesController = require('../app/controller/CoursesController');
const { route } = require('./me');

router.get('/create', coursesController.create);
router.post('/store', coursesController.storedCourses);
router.get('/:id/edit', coursesController.edit);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id', coursesController.delete);
router.delete('/:id/force', coursesController.forceDelete);
router.get('/:slug', coursesController.showCourse);
router.get('/', coursesController.index);

module.exports = router;
