const express = require('express');

// Controllers
const {
  getAllComments,
  getCommentById,
  createComment
} = require('../controllers/comment.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(validateSession);

router.get('/', getAllComments);

router.get('/:id', getCommentById);

router.post('/', createComment);

module.exports = { commentsRouter: router };
