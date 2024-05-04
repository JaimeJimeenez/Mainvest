'use strict'

const { deleteNotification } = require('../controllers/notification/delete.notification.controller');
const { getLikedPosts } = require('../controllers/notification/get.liked_posts.controller');
const { getRepliesPosts } = require('../controllers/notification/get.replies_posts.controller');
const { newNotification } = require('../controllers/notification/new.notificaction.controller');

const router = require('express').Router();

router.post('/new', newNotification);
router.get('/liked/:id', getLikedPosts);
router.get('/replies/:id', getRepliesPosts);
router.delete('/:idUser/:idPost/:isLiked', deleteNotification);

module.exports = router;