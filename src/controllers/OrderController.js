
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll();

    return res.json(orders);
  }

  async show(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Pedido não encontrado'
      });
    }

    return res.json(order);
  }

  async store(req, res) {
    const order = await Order.create(req.body);

    return res.status(201).json(order);
  }

  async finish(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Pedido não encontrado'
      });
    }

    const items = await OrderItem.findAll({
      where: {
        order_id: order.id
      }
    });

    if (!items.length) {
      return res.status(400).json({
        message: 'Pedido sem itens'
      });
    }

    let total = 0;

    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        return res.status(404).json({
          message: `Produto ${item.product_id} não encontrado`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Estoque insuficiente para ${product.name}`
        });
      }

      await product.update({
        stock: product.stock - item.quantity
      });

      total += Number(item.price) * item.quantity;
    }

    await order.update({
      status: 'completed',
      total
    });

    return res.json({
      message: 'Pedido finalizado com sucesso',
      total
    });
  }
}

export default new OrderController();