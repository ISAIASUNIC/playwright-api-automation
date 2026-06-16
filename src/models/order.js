import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
        total: Sequelize.DECIMAL
      },
      {
        sequelize,
        tableName: 'orders',
        underscored: true
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer'
    });
  }
}

export default Order;