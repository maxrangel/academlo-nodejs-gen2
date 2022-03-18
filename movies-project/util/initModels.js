// Models
const { User } = require('../models/user.model');
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');

const initModel = () => {
  // 1 User <--> M Review
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 Movie <--> M Review
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  // M Movie <--> M Actor
  Movie.belongsToMany(Actor, { through: ActorInMovie });
  Actor.belongsToMany(Movie, { through: ActorInMovie });
};

module.exports = { initModel };
