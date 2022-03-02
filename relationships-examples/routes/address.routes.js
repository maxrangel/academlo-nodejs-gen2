const express = require('express');

// Controllers
const {
	createAddress,
	getAddresses,
} = require('../controllers/address.controller');

const router = express.Router();

router.get('/', getAddresses);

router.post('/', createAddress);

module.exports = { addressRouter: router };
