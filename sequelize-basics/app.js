const express = require('express');

// Routers
const { postsRouter } = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes');

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

sequelize
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

sequelize
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('Express app running');
});

// Http status codes examples:
// 2** -> success
// 3** -> misc
// 4** -> Client errors
// 5** -> Server errors
