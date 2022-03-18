const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
