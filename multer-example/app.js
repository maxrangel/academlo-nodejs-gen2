const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { postsRouter } = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes');
const { commentsRouter } = require('./routes/comment.routes');

// Utils
const { AppError } = require('./util/appError');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/comments', commentsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };

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
