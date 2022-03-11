const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser
} = require('../controllers/users.controller');

// Middlewares
const {
  validateSession
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateSession, getAllUsers);

router.get('/:id', validateSession, getUserById);

router.post('/', validateSession, createNewUser);

router.post('/login', loginUser);

module.exports = { usersRouter: router };
