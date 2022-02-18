const express = require('express');

const users = [
	{ name: 'Max', age: 23 },
	{ name: 'John', age: 22 },
	{ name: 'Jill', age: 21 },
];

const posts = [
	{ id: 1, title: 'Post 1', content: 'Some content', author: 'Max' },
	{ id: 2, title: 'Post 2', content: 'Some content 2', author: 'John' },
	{ id: 3, title: 'Post 3', content: 'Some content 3', author: 'Jill' },
];

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
// GET http://localhost:4000/users
app.get('/users', (req, res) => {
	res.json({ status: 'success', data: { users } });
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

// PUT http://localhost:4000/posts/:id
app.put('/posts/:id', (req, res) => {
	const { id } = req.params;
	const { title, content, author } = req.body;

	// Validate the data has some value
	if (
		!title ||
		!content ||
		!author ||
		title.length === 0 ||
		content.length === 0 ||
		author.length === 0
	) {
		res.status(400).json({
			status: 'error',
			message: 'Must provide a title, content and the author for this reuqest',
		});
		return;
	}

	// Find post by id, and get the index
	const postIndex = posts.findIndex(post => post.id === +id);

	if (postIndex === -1) {
		res.status(404).json({
			status: 'error',
			message: 'Cant update post, invalid ID',
		});
		return;
	}

	// Update post and save it in the list
	const updatePost = posts[postIndex];

	updatePost.title = title;
	updatePost.content = content;
	updatePost.author = author;

	posts[postIndex] = updatePost;

	// 204 - No content
	res.status(204).json({ status: 'success' });
});

// PATCH http://localhost:4000/posts/:id
app.patch('/posts/:id', (req, res) => {
	const { id } = req.params;

	const filterObj = (obj, ...allowedFields) => {
		// allowedFields = ['title', 'content', 'author']
		// obj = { title: 'New title', content: 'New content', email, comment }

		const newObj = {};

		// Get the obj properties [title, content, email, comment]
		Object.keys(obj).forEach(el => {
			if (allowedFields.includes(el)) {
				newObj[el] = obj[el];
			}
		});

		return newObj;
	};

	const data = filterObj(req.body, 'title', 'content', 'author');

	const postIndex = posts.findIndex(post => post.id === +id);

	if (postIndex === -1) {
		res.status(404).json({
			status: 'error',
			message: 'Cant update post, invalid ID',
		});
		return;
	}

	let updatedPost = posts[postIndex];

	updatedPost = { ...updatedPost, ...data };

	posts[postIndex] = updatedPost;

	res.status(204).json({ status: 'success' });
});

// DELETE http://localhost:4000/posts/:id
app.delete('/posts/:id', (req, res) => {
	const { id } = req.params;

	// Find post index, by the given id
	const postIndex = posts.findIndex(post => post.id === +id);

	if (postIndex === -1) {
		res.status(404).json({
			status: 'error',
			message: 'Cant delete post, invalid ID',
		});
		return;
	}

	// Use splice to delete post
	posts.splice(postIndex, 1);

	res.status(204).json({ status: 'success' });
});

app.listen(4000, () => {
	console.log('Express app running');
});

// Http status codes examples:
// 2** -> success
// 3** -> misc
// 4** -> Client errors
// 5** -> Server errors
