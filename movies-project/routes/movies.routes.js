const express = require('express');

// Controllers
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

// Middlewares
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');

const { movieExists } = require('../middlewares/movies.middleware');

// Utils
const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllMovies)
  .post(protectAdmin, upload.single('img'), createMovie);

router
  .use('/:id', movieExists)
  .route('/:id')
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie);

module.exports = { moviesRouter: router };
