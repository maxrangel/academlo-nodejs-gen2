// Models
const { Comment } = require('../models/comment.model');

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { status: 'active' } });

    res.status(200).json({
      status: 'success',
      data: { comments }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({
      where: { status: 'active', id }
    });

    if (!comment) {
      res.status(404).json({
        status: 'error',
        message: 'Comment not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { comment }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createComment = async (req, res) => {
  try {
    const { text, postId, userId } = req.body;

    if (!text || !postId || !userId) {
      res.status(400).json({
        status: 'error',
        message: 'Must provide text, postId and userId'
      });
      return;
    }

    const newComment = await Comment.create({ text, postId, userId });

    res.status(201).json({
      status: 'success',
      data: { newComment }
    });
  } catch (error) {
    console.log(error);
  }
};
