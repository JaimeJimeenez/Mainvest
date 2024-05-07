'use strict'

const { followUser } = require('../controllers/social/follow_user.controller');
const { getFollowersUsers } = require('../controllers/social/get.followers.controller');
const { getFollowings } = require('../controllers/social/get.followings.controller');
const { getFollowingsUsers } = require('../controllers/social/get.followings_user.controller');
const { unfollowUser } = require('../controllers/social/unfollow.controller');

const router = require('express').Router();

router.get('/followings/:id', getFollowings);
router.get('/followers/:id', getFollowersUsers);
router.get('/followings_users/:id', getFollowingsUsers);
router.delete('/unfollow/:idFollowing/:idFollower', unfollowUser);
router.post('/follow', followUser);

module.exports = router;