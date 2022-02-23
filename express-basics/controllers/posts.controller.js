// Utils
const { filterObj } = require('../util/filterObj');

const posts = [
	{ id: 1, title: 'Post 1', content: 'Some content', author: 'Max' },
	{ id: 2, title: 'Post 2', content: 'Some content 2', author: 'John' },
	{ id: 3, title: 'Post 3', content: 'Some content 3', author: 'Jill' },
	{ id: 4, title: 'Superlongt', content: 'Some content 3', author: 'Jill' },
];

// Get all posts
// export const getAllPosts
exports.getAllPosts = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			posts,
		},
	});
};

// Get post by id
exports.getPostById = (req, res) => {
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
};

// Save post to database
exports.createPost = (req, res) => {
	const { title, content } = req.body; // { ... }

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
};

// Update post (put)
exports.updatePostPut = (req, res) => {
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
};

// Update post (patch)
exports.updatePostPatch = (req, res) => {
	const { id } = req.params;
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
};

// Delete post
exports.deletePost = (req, res) => {
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
};
