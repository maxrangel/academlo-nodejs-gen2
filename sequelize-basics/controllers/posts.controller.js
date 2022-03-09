// Models
const { Post } = require('../models/post.model');

// Utils
const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

// Get all posts
// export const getAllPosts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  // SELECT * FROM posts WHERE status = 'active'; -> posts[]
  const posts = await Post.findAll({ where: { status: 'active' } });

  res.status(200).json({
    status: 'success',
    data: {
      posts
    }
  });
});

// Get post by id
exports.getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // SELECT * FROM posts WHERE id = 1;
  const post = await Post.findOne({
    where: { id: id, status: 'active' }
  });

  if (!post) {
    return next(new AppError(404, 'No post found with the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  });
});

// Save post to database
exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return next(
      new AppError(400, 'Must provide a valid title, content and userId')
    );
  }

  // INSERT INTO posts (title, content, userId) VALUES ('A new post', 'Saved in db', 1)
  const newPost = await Post.create({
    title: title, // dbColumn: valueToInsert
    content: content,
    userId: userId
  });

  res.status(201).json({
    status: 'success',
    data: { newPost }
  });
});

// Update post (put)
exports.updatePostPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    // Validate the data has some value
    if (
      !title ||
      !content ||
      !author ||
      title.length === 0 ||
      content.length === 0 ||
      author.length === 0
    ) {
      res.status(400).json({
        status: 'error',
        message: 'Must provide a title, content and the author for this request'
      });
      return;
    }

    const post = await Post.findOne({
      where: { id: id, status: 'active' }
    });

    if (!post) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update post, invalid ID'
      });
      return;
    }

    await post.update({
      title: title,
      content: content,
      author: author
    });

    // 204 - No content
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

// Update post (patch)
exports.updatePostPatch = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'title', 'content', 'author'); // { title } | { title, author } | { content }

    const post = await Post.findOne({
      where: { id: id, status: 'active' }
    });

    if (!post) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update post, invalid ID'
      });
      return;
    }

    await post.update({ ...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: { id: id, status: 'active' }
    });

    if (!post) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete post, invalid ID'
      });
      return;
    }

    // DELETE FROM posts WHERE id = 1;
    // await post.destroy();

    // Soft delete
    await post.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
