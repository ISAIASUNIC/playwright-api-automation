import Sequelize from 'sequelize';
import config from '../../config/config.json' with { type: 'json' };

import Product from '../models/Product.js';

const connection = new Sequelize(config.development);

Product.init(connection);

export default connection;