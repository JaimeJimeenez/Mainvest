'use strict'

const router = require('express').Router();

const { signUp } = require('../controllers/auth/signup.controller');
const { checkUserExists } = require('../middleware/auth/checkUserExists');

router.post('/signup', checkUserExists, signUp);

module.exports = router;