const express = require('express');
const { body } = require('express-validator');

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
const {
  createMovieValidators,
  validateResult
} = require('../middlewares/validators.middleware');

const { movieExists } = require('../middlewares/movies.middleware');

// Utils
const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllMovies)
  .post(
    protectAdmin,
    upload.single('img'),
    createMovieValidators,
    validateResult,
    createMovie
  );

// BONUS
// router.route('/reviews').get().post();

// router.route('/reviews/:movieId').get().patch().delete();

router
  .use('/:id', movieExists)
  .route('/:id')
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie);

module.exports = { moviesRouter: router };
