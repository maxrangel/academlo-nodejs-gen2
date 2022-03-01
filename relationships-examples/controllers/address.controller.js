const { Address } = require('../models/address.model');

exports.getAddresses = async (req, res) => {
	try {
		const addresses = await Address.findAll();

		res.status(200).json({
			status: 'success',
			data: { addresses },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createAddress = async (req, res) => {
	try {
		const { state, country, zipCode } = req.body;

		// Missing userId
		const newAddress = await Address.create({ state, country, zipCode });

		res.status(201).json({
			status: 'success',
			data: { newAddress },
		});
	} catch (error) {
		console.log(error);
	}
};
