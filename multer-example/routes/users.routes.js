const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser,
  checkToken
} = require('../controllers/users.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', createNewUser);

router.post('/login', loginUser);

router.use(validateSession);

router.get('/', getAllUsers);

router.get('/check-token', checkToken);

router.get('/:id', getUserById);

module.exports = { usersRouter: router };
