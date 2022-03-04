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

// Middlewares

// const validateSession = (req, res, next) => {
//   // Validate session
//   console.log('Validate session middleware');

//   const { email, password } = req.body;

//   if (email !== 'max@gmail.com' || password !== 'pass1234') {
//     console.log('Invalid session!');
//     res.status(403).json({ status: 'error', message: 'Invalid credentials' });
//     return;
//   }

//   next();
// };

// const validateBody = (req, res, next) => {
//   // Validate req.body
//   console.log('Middleware #2');
//   next();
// };

// app.post(
//   '/middleware-example',
//   validateSession,
//   validateBody,
//   (req, res, next) => {
//     // Create new user...

//     // ...etc
//     console.log('Middleware #3');
//     res.status(200).json({ status: 'success' });
//   }
// );
