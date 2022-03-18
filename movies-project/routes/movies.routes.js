const express = require('express');

// Controllers
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createMovie);

router.patch('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };
