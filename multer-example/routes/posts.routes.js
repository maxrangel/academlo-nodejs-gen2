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

router.get('/', getAllPosts);

// GET http://localhost:4000/posts/:id
router.get('/:id', getPostById);

// POST http://localhost:4000/posts
router.post('/', upload.single('postImg'), createPost);

// PUT http://localhost:4000/posts/:id
router.put('/:id', updatePostPut);

// PATCH http://localhost:4000/posts/:id
router.patch('/:id', updatePostPatch);

// DELETE http://localhost:4000/posts/:id
router.delete('/:id', deletePost);

module.exports = { postsRouter: router };
// module.exports = router // export default router
