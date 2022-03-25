const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Movie } = require('../models/movie.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({ where: { status: 'active' } });

  res.status(200).json({
    status: 'success',
    data: { movies }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { movie } = req;

  res.status(200).json({
    status: 'success',
    data: { movie }
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  // Upload img to firebase
  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/movies/${title}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    img: imgUploaded.metadata.fullPath,
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

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'genre'
  );

  await movie.update({ ...data });

  res.status(204).json({ status: 'success' });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
