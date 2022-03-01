const { User } = require('../models/user.model');

exports.getUsers = async (req, res) => {
	try {
		const users = await User.findAll();

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
