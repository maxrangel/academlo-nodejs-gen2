const express = require('express');

// Controllers
// import { getAllPosts } from '../controllers/posts.controller'
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostPut,
  updatePostPatch,
  deletePost
} = require('../controllers/posts.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');

// Utils
const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router.route('/').get(getAllPosts).post(upload.single('postImg'), createPost);

router
  .route('/:id')
  .get(getPostById)
  .put(updatePostPut)
  .patch(updatePostPatch)
  .delete(deletePost);

module.exports = { postsRouter: router };
// module.exports = router // export default router
