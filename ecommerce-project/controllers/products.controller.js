// Models
const { Product } = require('../models/product.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({ where: { status: 'active' } });

  res.status(200).json({
    status: 'success',
    data: { products }
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({
    status: 'success',
    data: { product }
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, price } = req.body;
  const { id } = req.currentUser;

  const newProduct = await Product.create({
    title,
    description,
    quantity,
    price,
    userId: id
  });

  res.status(201).json({
    status: 'success',
    data: { newProduct }
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  const data = filterObj(req.body, 'title', 'description', 'quantity', 'price');

  await product.update({ ...data });

  res.status(204).json({ status: 'success' });
});

exports.disableProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
