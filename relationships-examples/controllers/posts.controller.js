const { Post } = require('../models/post.model');

exports.getPosts = async (req, res) => {
	try {
		const posts = await Post.findAll();

		res.status(200).json({
			status: 'success',
			data: { posts },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getPostById = async (req, res) => {
	try {
		const { id } = req.params;

		const post = await Post.findOne({ where: { id } });

		res.status(200).json({
			status: 'success',
			data: { post },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createPost = async (req, res) => {
	try {
		const { title, content, userId } = req.body;

		const newPost = await Post.create({ title, content, userId });

		res.status(201).json({
			status: 'success',
			data: { newPost },
		});
	} catch (error) {
		console.log(error);
	}
};
