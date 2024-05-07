'use strict'

const router = require('express').Router();

const { signUp } = require('../controllers/auth/signup.controller');
const { logIn } = require('../controllers/auth/login.controller');

const { validateSignUp } = require('../middleware/auth/validateSignUp');
const { validateLogIn } = require('../middleware/auth/validateLogIn'); 

router.post('/signup', validateSignUp, signUp);
router.get('/login/:user',  validateLogIn, logIn);

module.exports = router;