const express = require('express');

// Controllers
const {
	getPosts,
	getPostById,
	createPost,
} = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPostById);

router.post('/', createPost);

module.exports = { postsRouter: router };
