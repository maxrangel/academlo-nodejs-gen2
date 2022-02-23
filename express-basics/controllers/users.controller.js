const { filterObj } = require('../util/filterObj');

const users = [
	{ id: 1, name: 'Max', age: 23 },
	{ id: 2, name: 'John', age: 22 },
	{ id: 3, name: 'Jill', age: 21 },
];

// Get all users
exports.getAllUsers = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: { users },
	});
};

// Get user by ID
exports.getUserById = (req, res) => {
	const { id } = req.params;

	const user = users.find(user => user.id === +id);

	if (!user) {
		res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
		return;
	}

	res.status(200).json({
		status: 'success',
		data: { user },
	});
};

// Save new user
exports.createNewUser = (req, res) => {
	const { name, age } = req.body;

	if (!name || !age) {
		res.status(400).json({
			status: 'error',
			message: 'Must provide a valid name and an age',
		});
		return;
	}

	const newUser = {
		id: Math.floor(Math.random() * 1000),
		name,
		age,
	};

	users.push(newUser);

	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
};

// Update user (patch)
exports.updateUser = (req, res) => {
	const { id } = req.params;
	const data = filterObj(req.body, 'name', 'age');

	const userIndex = users.findIndex(user => user.id === +id);

	if (userIndex === -1) {
		res.status(404).json({
			status: 'error',
			message: 'Cant update user, not a valid ID',
		});
		return;
	}

	let updatedUser = users[userIndex];

	updatedUser = { ...updatedUser, ...data };

	users[userIndex] = updatedUser;

	res.status(204).json({ status: 'success' });
};

// Delete user
exports.deleteUser = (req, res) => {
	const { id } = req.params;

	const userIndex = users.findIndex(user => user.id === +id);

	if (userIndex === -1) {
		res.status(404).json({
			status: 'error',
			message: 'Cant delete user, invalid ID',
		});
		return;
	}

	users.splice(userIndex, 1);

	res.status(204).json({ status: 'success' });
};
