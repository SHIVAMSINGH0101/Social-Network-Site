//here we create all routes related to user's posts
const express = require('express');

const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment,
    updateComment
} = require('../controllers/post');

const { requireSignin } = require('../controllers/auth');

const { userById } = require('../controllers/user');

const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

//to see whether a user is signin or not before giving access to a route
//use the "requireSignin" method that we created in auth controllers

// all like/unlike related routes
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// all comments related routes
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);
router.put('/post/updatecomment', requireSignin, updateComment);

// all post related routes
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
// photo
router.get('/post/photo/:postId', photo);

// any route containing :userId, our app will first execute userById() function
//see for the userId in request parameter
router.param('userId', userById);
// any route containing :postId, our app will first execute postById() function
//see for the postId in request parameter
router.param('postId', postById);

module.exports = router;
