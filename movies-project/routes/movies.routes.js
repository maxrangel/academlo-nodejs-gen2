const express = require('express');

// Controllers
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

// Utils
const { upload } = require('../util/multer');

const router = express.Router();

router.route('/').get(getAllMovies).post(upload.single('img'), createMovie);

router.route('/:id').get(getMovieById).patch(updateMovie).delete(deleteMovie);

module.exports = { moviesRouter: router };
