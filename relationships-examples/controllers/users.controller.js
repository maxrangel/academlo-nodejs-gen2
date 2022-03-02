const { User } = require('../models/user.model');
const { Address } = require('../models/address.model');
const { Post } = require('../models/post.model');

exports.getUsers = async (req, res) => {
	try {
		// SELECT * FROM users
		// JOIN address ON users.id = addresses.userId
		// JOIN posts ON posts.userId = users.id

		// Step 2: Use the attribute include
		const users = await User.findAll({
			include: [{ model: Address }, { model: Post }],
		});

		res.status(200).json({
			status: 'success',
			data: { users },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findOne({ where: { id } });

		res.status(200).json({
			status: 'success',
			data: { user },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createUser = async (req, res) => {
	try {
		const { name } = req.body;

		const newUser = await User.create({ name });

		res.status(201).json({
			status: 'success',
			data: { newUser },
		});
	} catch (error) {
		console.log(error);
	}
};
