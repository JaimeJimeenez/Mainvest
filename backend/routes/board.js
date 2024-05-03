'use strict'

const router = require('express').Router();

const { addLike } = require('../controllers/board/add.like.controller');
const { deleteLike } = require('../controllers/board/delete.like.controller');
const { getFollowingsPosts } = require('../controllers/board/get.following_posts');
const { getLikedPosts } = require('../controllers/board/get.liked_posts.controller');
const { getRandomPosts } = require('../controllers/board/get.random_posts.controller');
const { getUsersLikesPosts } = require('../controllers/board/get.users_likes.controller');
const { getUsersPosts } = require('../controllers/board/get.users_posts.controller');
const { newPost } = require('../controllers/board/new.post.controller');
const { newReply } = require('../controllers/board/new.reply.controller');
const { updateLike } = require('../controllers/board/update.like.controller');

router.post('/new_post', newPost);
router.get('/random_posts', getRandomPosts);
router.post('/new_reply', newReply);
router.put('/update_like', updateLike);
router.post('/add_like', addLike);
router.delete('/delete_like/:idUser/:idPost', deleteLike);
router.get('/liked_posts/:id', getLikedPosts);
router.get('/following_posts/:ids', getFollowingsPosts);
router.get('/get_users/:id', getUsersPosts);
router.get('/get_users_likes/:id', getUsersLikesPosts);

module.exports = router;