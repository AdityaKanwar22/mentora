const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);
router.get('/me', auth(true), controller.me);

module.exports = router;


