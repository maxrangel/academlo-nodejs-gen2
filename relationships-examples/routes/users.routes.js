const express = require('express');

// Controllers
const {
	createUser,
	getUserById,
	getUsers,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

module.exports = { userRouter: router };
