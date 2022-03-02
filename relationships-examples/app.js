const express = require('express');

// Models
const { User } = require('./models/user.model');
const { Address } = require('./models/address.model');
const { Post } = require('./models/post.model');

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

// Step 1: Establish model relations

// 1 User <---> 1 Address
User.hasOne(Address); // user: { ..., address: { ..addressProps } }
Address.belongsTo(User);

// 1 User <---> M Posts
User.hasMany(Post); // user: { ..., posts: [{}, {}, {}] }
Post.belongsTo(User);

// Examples on how to define different types of relations
// 1 User <----> M Address
// User.hasMany(Address)
// Address.belongsTo(User)

// M User <----> M Address
// User.hasMany(Address)
// Address.belongsToMany(User)

sequelize
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('API running');
});

// API features:

// Create users
// Give the user an address
// Allow the user to create posts

// Relations explaination

// 1 User <---> 1 Address
// 1 User <---> M Posts

// Endpoints to apply relations

// GET /users -> users { address, posts: [] }
// GET /address -> address {..., user}
// GET /posts -> posts {..., user}
