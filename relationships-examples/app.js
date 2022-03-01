const express = require('express');

// Routers
const { userRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');
const { addressRouter } = require('./routes/address.routes');

// Utils
const { sequelize } = require('./utils/database');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/address', addressRouter);

sequelize
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

sequelize
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('API running');
});
