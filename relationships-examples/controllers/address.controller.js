const { Address } = require('../models/address.model');
const { User } = require('../models/user.model');

exports.getAddresses = async (req, res) => {
	try {
		// SELECT * FROM addresses
		// JOIN users ON users.id = addresses.userId
		const addresses = await Address.findAll({
			include: [{ model: User }],
		});

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
		const { street, state, country, zipCode, userId } = req.body;

		const newAddress = await Address.create({
			street,
			state,
			country,
			zipCode,
			userId,
		});

		res.status(201).json({
			status: 'success',
			data: { newAddress },
		});
	} catch (error) {
		console.log(error);
	}
};
