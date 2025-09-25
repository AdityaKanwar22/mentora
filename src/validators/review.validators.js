const { body, param } = require('express-validator');

const createReviewValidation = [
  body('courseId').isMongoId(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().isString().isLength({ max: 1000 }),
];

const updateReviewValidation = [
  param('id').isMongoId(),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('comment').optional().isString().isLength({ max: 1000 }),
];

const idParamValidation = [param('id').isMongoId()];

module.exports = {
  createReviewValidation,
  updateReviewValidation,
  idParamValidation,
};


