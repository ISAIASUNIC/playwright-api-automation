import Sequelize, { Model } from 'sequelize';

class OrderItem extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'order_items',
        underscored: true
      }
    );

    return this;
  }
}

export default OrderItem;