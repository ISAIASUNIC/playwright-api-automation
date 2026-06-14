import productService from '../models/Product.js';

class ProductController {
  async index(req, res) {
    const products = await productService.findAll();

    return res.json(products);
  }

  async update(req, res) {
  const product = await productService.findByPk(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    });
  }

  await product.update(req.body);

  return res.json(product);
}

async show(req, res) {
  const product = await productService.findByPk(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    });
  }

  return res.json(product);
}

  async store(req, res) {
    const product = await productService.create(req.body);

    return res.status(201).json(product);
  }

  async remove(req, res) {
    const product = await productService.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produto nao encontrado' });
    }

    await product.destroy();

    return res.status(204).json();
  }
}

export default new ProductController();