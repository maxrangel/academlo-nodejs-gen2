const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movies.routes');

const app = express();

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);

module.exports = { app };
