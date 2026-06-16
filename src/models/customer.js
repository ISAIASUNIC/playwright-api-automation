import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING
      },
      {
        sequelize,
        tableName: 'customers',
        underscored: true
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Order, {
      foreignKey: 'customer_id',
      as: 'orders'
    });
  }
}

export default Customer;