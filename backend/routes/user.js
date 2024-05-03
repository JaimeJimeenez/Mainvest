'use strict'

const router = require('express').Router();

const { getUsername } = require('../controllers/user/get.username.controller');
const { updatePassword } = require('../controllers/user/update.password.controller');
const { updateUsername } = require('../controllers/user/update.username.controller');
const { eraseUser } = require('../controllers/user/erase.user.controller');
const { getUserByUsername } = require('../controllers/user/get.user_by_username.controller');

router.get('/username/:id', getUsername);
router.put('/password', updatePassword);
router.put('/username', updateUsername);
router.delete('/erase/:id', eraseUser);
router.get('/:username', getUserByUsername);

module.exports = router;