const express = require('express');

// Controller
const {
  addProductToCart,
  getUserCart,
  updateCartProduct,
  removeProductFromCart,
  purchaseCart
} = require('../controllers/cart.controller');

// Middleware
const { validateSession } = require('../middlewares/auth.middleware');
const {
  productInCartValidation,
  validateResult
} = require('../middlewares/validators.middleware');
const { cartExists } = require('../middlewares/cart.middleware');
const { productExists } = require('../middlewares/products.middleware');

const router = express.Router();

router.use(validateSession);

router.get('/', getUserCart);

router.post(
  '/add-product',
  productInCartValidation,
  validateResult,
  addProductToCart
);

router.patch(
  '/update-product',
  productInCartValidation,
  validateResult,
  productExists,
  cartExists,
  updateCartProduct
);

router.post('/purchase', cartExists, purchaseCart);

router.delete('/:productId', cartExists, removeProductFromCart);

module.exports = { cartRouter: router };
