const express = require('express');

// Controllers
const {
	createAddress,
	getAddress,
} = require('../controllers/address.controller');

const router = express.Router();

router.get('/', getAddress);

router.post('/', createAddress);

module.exports = { addressRouter: router };
