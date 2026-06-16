import Sequelize from 'sequelize';
import config from '../../config/config.json' with { type: 'json' };
import Product from '../models/Product.js';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import User from '../models/user.js';

const models = [
  Product,
  Customer,
  Order,
  OrderItem,
  User
];

const connection = new Sequelize(config.development);

models.forEach(model => model.init(connection));

models.forEach(model => {
  if (model.associate) {
    model.associate(connection.models);
  }
});

export default connection;