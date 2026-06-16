import OrderItem from '../models/OrderItem.js';

class OrderItemController {
  async store(req, res) {
    const item = await OrderItem.create(req.body);

    return res.status(201).json(item);
  }
}

export default new OrderItemController();