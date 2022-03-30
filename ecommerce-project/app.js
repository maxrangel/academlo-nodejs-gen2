const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');

const app = express();

// Enable incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.use('/api/v1/users', usersRouter);

app.use(globalErrorHandler);

module.exports = { app };
