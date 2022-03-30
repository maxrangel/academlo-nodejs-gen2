const { ref, uploadBytes } = require('firebase/storage');

// Models
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');
const { Email } = require('../util/email');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actor }]
  });

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

  // Get actors for email
  const movieActors = await Actor.findAll({
    include: [
      {
        model: Movie,
        through: { where: { movieId: newMovie.id } }
      }
    ]
  });

  // ! In a real app, we get the subscribed emails of our app and send emails to those emails
  new Email('max@gmail.com').sendNewMovie(newMovie, movieActors);

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
