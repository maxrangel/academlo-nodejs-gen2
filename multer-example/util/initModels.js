// Models
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

const initModels = () => {
  // 1 User <----> M Post
  User.hasMany(Post);
  Post.belongsTo(User);

  // 1 Post <---> M Comment
  Post.hasMany(Comment);
  Comment.belongsTo(Post);

  // 1 User <---> M Comment
  User.hasMany(Comment);
  Comment.belongsTo(User);
};

module.exports = { initModels };
