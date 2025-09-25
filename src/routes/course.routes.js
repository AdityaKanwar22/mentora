const { Router } = require('express');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/roles');
const validate = require('../middlewares/validate');
const controller = require('../controllers/course.controller');
const {
  createCourseValidation,
  updateCourseValidation,
  idParamValidation,
} = require('../validators/course.validators');

const router = Router();

// All course management routes require instructor or admin
router.get('/mine', auth(true), requireRole('instructor', 'admin'), controller.listMyCourses);
router.post('/', auth(true), requireRole('instructor', 'admin'), createCourseValidation, validate, controller.createCourse);
router.put('/:id', auth(true), requireRole('instructor', 'admin'), updateCourseValidation, validate, controller.updateCourse);
router.delete('/:id', auth(true), requireRole('instructor', 'admin'), idParamValidation, validate, controller.deleteCourse);
router.post('/:id/publish', auth(true), requireRole('instructor', 'admin'), idParamValidation, validate, controller.publishCourse);
router.post('/:id/unpublish', auth(true), requireRole('instructor', 'admin'), idParamValidation, validate, controller.unpublishCourse);

module.exports = router;


