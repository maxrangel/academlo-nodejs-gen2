// Models
const { Post } = require('../models/post.model');

// Utils
const { filterObj } = require('../util/filterObj');

// Get all posts
// export const getAllPosts
exports.getAllPosts = async (req, res) => {
	try {
		// SELECT * FROM posts; -> posts[]
		const postsDb = await Post.findAll();

		res.status(200).json({
			status: 'success',
			data: {
				posts: postsDb,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

// Get post by id
exports.getPostById = async (req, res) => {
	try {
		const { id } = req.params;

		// SELECT * FROM posts WHERE id = 1;
		const post = await Post.findOne({ where: { id: id } });

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
	} catch (error) {
		console.log(error);
	}
};

// Save post to database
exports.createPost = async (req, res) => {
	try {
		const { title, content, author } = req.body;

		// INSERT INTO posts (title, content, author) VALUES ('A new post', 'Saved in db', 'Max')
		const newPost = await Post.create({
			title: title, // dbColumn: valueToInsert
			content: content,
			author: author,
		});

		res.status(201).json({
			status: 'success',
			data: { newPost },
		});
	} catch (error) {
		console.log(error);
	}
};

// Update post (put)
exports.updatePostPut = async (req, res) => {
	try {
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
				message:
					'Must provide a title, content and the author for this request',
			});
			return;
		}

		const post = await Post.findOne({ where: { id: id } });

		if (!post) {
			res.status(404).json({
				status: 'error',
				message: 'Cant update post, invalid ID',
			});
			return;
		}

		await post.update({
			title: title,
			content: content,
			author: author,
		});

		// 204 - No content
		res.status(204).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

// Update post (patch)
exports.updatePostPatch = async (req, res) => {
	try {
		const { id } = req.params;
		const data = filterObj(req.body, 'title', 'content', 'author'); // { title } | { title, author } | { content }

		const post = await Post.findOne({ where: { id: id } });

		if (!post) {
			res.status(404).json({
				status: 'error',
				message: 'Cant update post, invalid ID',
			});
			return;
		}

		await post.update({ ...data }); // .update({ content })

		res.status(204).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

// Delete post
exports.deletePost = async (req, res) => {
	try {
		const { id } = req.params;

		const post = await Post.findOne({ where: { id: id } });

		if (!post) {
			res.status(404).json({
				status: 'error',
				message: 'Cant delete post, invalid ID',
			});
			return;
		}

		// DELETE FROM posts WHERE id = 1;
		await post.destroy();

		res.status(204).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};
