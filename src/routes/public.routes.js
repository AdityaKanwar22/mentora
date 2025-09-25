const { Router } = require('express');
const controller = require('../controllers/public.controller');
const validate = require('../middlewares/validate');
const { query, param } = require('express-validator');

const router = Router();

router.get(
  '/courses',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('q').optional().isString(),
    query('category').optional().isString(),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
  ],
  validate,
  controller.listCourses
);

router.get('/courses/:id', [param('id').isMongoId()], validate, controller.getCourseDetail);

module.exports = router;


