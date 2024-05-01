'use strict'

const { getFollowings } = require('../controllers/social/get.followings.controller');

const router = require('express').Router();

router.get('/followings/:id', getFollowings);

module.exports = router;