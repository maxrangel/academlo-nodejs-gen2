const express = require('express');

const users = [
	{ name: 'Max', age: 23 },
	{ name: 'John', age: 22 },
	{ name: 'Jill', age: 21 },
];

const posts = [
	{ id: 1, title: 'Post 1', content: 'Some content' },
	{ id: 2, title: 'Post 2', content: 'Some content 2' },
	{ id: 3, title: 'Post 3', content: 'Some content 3' },
];

// Init express app
const app = express();

app.use(express.json());

// Endpoints
// GET http://localhost:4000/users
app.get('/users', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			users,
		},
	});
});

// GET http://localhost:4000/posts
app.get('/posts', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			posts,
		},
	});
});

// GET http://localhost:4000/posts/:id
app.get('/posts/:id', (req, res) => {
	const { id } = req.params;

	const post = posts.find(post => post.id === +id);

	if (!post) {
		res.status(404).json({
			status: 'error',
			message: 'No post found with the given ID',
		});
		return;
	}

	res.status(200).json({
		status: 'success',
		data: {
			post,
		},
	});
});

// POST http://localhost:4000/posts
app.post('/posts', (req, res) => {
	const { title, content } = req.body;

	const newPost = {
		id: Math.floor(Math.random() * 100),
		title,
		content,
	};

	posts.push(newPost);

	res.status(201).json({
		status: 'success',
		data: { newPost },
	});
});

app.listen(4000, () => {
	console.log('Express app running');
});

// Http status codes examples:
// 2** -> success
// 3** -> misc
// 4** -> Client errors
// 5** -> Server errors
