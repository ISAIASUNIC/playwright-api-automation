import Customer from '../models/Customer.js';

class CustomerController {
  async index(req, res) {
    const customers = await Customer.findAll();

    return res.json(customers);
  }

  async show(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: 'Cliente não encontrado'
      });
    }

    return res.json(customer);
  }

  async store(req, res) {
    const customer = await Customer.create(req.body);

    return res.status(201).json(customer);
  }

  async update(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: 'Cliente não encontrado'
      });
    }

    await customer.update(req.body);

    return res.json(customer);
  }

  async remove(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: 'Cliente não encontrado'
      });
    }

    await customer.destroy();

    return res.status(204).send();
  }
}

export default new CustomerController();