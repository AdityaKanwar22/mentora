const { Router } = require('express');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/roles');
const validate = require('../middlewares/validate');
const controller = require('../controllers/review.controller');
const { createReviewValidation, updateReviewValidation, idParamValidation } = require('../validators/review.validators');

const router = Router();

router.post('/', auth(true), requireRole('student', 'admin'), createReviewValidation, validate, controller.create);
router.put('/:id', auth(true), requireRole('student', 'admin'), updateReviewValidation, validate, controller.update);
router.delete('/:id', auth(true), requireRole('student', 'admin'), idParamValidation, validate, controller.remove);

module.exports = router;


