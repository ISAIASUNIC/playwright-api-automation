import Product from '../models/Product.js';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
class DashboardController {
  async index(req, res) {
    const totalProducts = await Product.count();
    const totalCustomers = await Customer.count();
    const totalOrders = await Order.count();

    const completedOrders = await Order.count({
      where: {
        status: 'completed'
      }
    });

    const orders = await Order.findAll();

    const salesTotal = orders.reduce(
      (total, order) => total + Number(order.total || 0),
      0
    );

    return res.json({
      totalProducts,
      totalCustomers,
      totalOrders,
      completedOrders,
      salesTotal
    });
  }
}

export default new DashboardController();