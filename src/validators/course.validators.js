const { body, param } = require('express-validator');

const urlArrayValidator = (field) =>
  body(field)
    .isArray({ min: 0 })
    .withMessage(`${field} must be an array`)
    .bail()
    .optional({ nullable: true })
    .custom((arr) => arr.every((v) => typeof v === 'string'))
    .withMessage(`${field} must be an array of strings`);

const createCourseValidation = [
  body('title').isString().trim().isLength({ min: 3 }).withMessage('title required (>=3)'),
  body('description').isString().trim().isLength({ min: 10 }).withMessage('description required (>=10)'),
  body('price').isFloat({ min: 0 }).withMessage('price must be >= 0'),
  body('category').isString().trim().isLength({ min: 2 }).withMessage('category required'),
  body('thumbnail').isURL().withMessage('thumbnail must be a valid URL'),
  urlArrayValidator('videos'),
];

const updateCourseValidation = [
  param('id').isMongoId(),
  body('title').optional().isString().trim().isLength({ min: 3 }),
  body('description').optional().isString().trim().isLength({ min: 10 }),
  body('price').optional().isFloat({ min: 0 }),
  body('category').optional().isString().trim().isLength({ min: 2 }),
  body('thumbnail').optional().isURL(),
  urlArrayValidator('videos').optional(),
];

const idParamValidation = [param('id').isMongoId()];

module.exports = {
  createCourseValidation,
  updateCourseValidation,
  idParamValidation,
};


