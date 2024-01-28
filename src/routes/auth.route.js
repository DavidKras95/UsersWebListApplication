const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/loginGet', AuthController.loginGet);
router.get('/signupGet', AuthController.signupGet);

router.post('/login', AuthController.loginPost);
router.post('/signup', AuthController.signupPost);

// router.get('/setCookies',AuthController.setCookies);
// router.get('/readCookies',AuthController.readCookies);



module.exports = router;



