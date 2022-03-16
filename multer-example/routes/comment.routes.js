const express = require('express');

const {
  getAllComments,
  getCommentById,
  createComment
} = require('../controllers/comment.controller');

const router = express.Router();

router.get('/', getAllComments);

router.get('/:id', getCommentById);

router.post('/', createComment);

module.exports = { commentsRouter: router };
