const express = require('express');

// Models
const { Post } = require('./models/post.model');
const { User } = require('./models/user.model');
const { Comment } = require('./models/comment.model');

// Routers
const { postsRouter } = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes');
const { commentsRouter } = require('./routes/comment.routes');

// Utils
const { sequelize } = require('./util/database');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
// http://localhost:4000/api/v1/posts
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/comments', commentsRouter);

sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Models relations
// 1 User <----> M Post
User.hasMany(Post);
Post.belongsTo(User);

// 1 Post <---> M Comment
Post.hasMany(Comment);
Comment.belongsTo(Post);

// 1 User <---> M Comment
User.hasMany(Comment);
Comment.belongsTo(User);

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('Express app running');
});

// Http status codes examples:
// 2** -> success
// 3** -> misc
// 4** -> Client errors
// 5** -> Server errors
