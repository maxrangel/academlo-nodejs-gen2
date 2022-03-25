const { Movie } = require('../models/movie.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({ where: { status: 'active' } });

  res.status(200).json({
    status: 'success',
    data: { movies }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    img: 'img.png',
    rating,
    genre
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    // Assign actors to newly created movie
    return await ActorInMovie.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  res.status(200).json({
    status: 'success',
    data: { newMovie }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {});

exports.deleteMovie = catchAsync(async (req, res, next) => {});
