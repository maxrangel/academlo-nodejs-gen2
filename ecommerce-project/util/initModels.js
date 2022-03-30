// Models
const { User } = require('../models/user.model');
const { Product } = require('../models/product.model');
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');
const { Order } = require('../models/order.model');

const initModels = () => {
  // 1 User <--> M Product
  User.hasMany(Product);
  Product.belongsTo(User);

  // 1 User <--> M Order
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1 User <--> 1 Cart
  User.hasOne(Cart);
  Cart.belongsTo(User);

  // M Cart <--> M Product
  Cart.belongsToMany(Product, { through: ProductInCart });
  Product.belongsToMany(Cart, { through: ProductInCart });

  // 1 Order <--> 1 Cart
  Cart.hasOne(Order);
  Order.belongsTo(Cart);
};

module.exports = { initModels };
