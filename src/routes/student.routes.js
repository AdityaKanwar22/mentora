const { Router } = require('express');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/roles');
const validate = require('../middlewares/validate');
const { body, param } = require('express-validator');
const controller = require('../controllers/student.controller');

const router = Router();

router.post(
  '/enroll',
  auth(true),
  requireRole('student', 'admin'),
  [body('courseId').isMongoId()],
  validate,
  controller.enroll
);

router.post(
  '/progress',
  auth(true),
  requireRole('student', 'admin'),
  [body('courseId').isMongoId(), body('videoUrl').isString().isURL()],
  validate,
  controller.completeLesson
);

router.get(
  '/progress/:courseId',
  auth(true),
  requireRole('student', 'admin'),
  [param('courseId').isMongoId()],
  validate,
  controller.getProgress
);

module.exports = router;


