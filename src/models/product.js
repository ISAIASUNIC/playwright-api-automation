import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        stock: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: 'products',
        underscored: true
      }
    );

    return this;
  }
}

export default Product;