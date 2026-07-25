import Product from '../models/Product.js';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }

  async show(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }

    return res.json(product);
  }

  // 🛡️ NOSSA NOVA BARREIRA DE SEGURANÇA!
  async store(req, res) {
    const { name, price, stock } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'O nome do produto é obrigatório e deve ser um texto.' });
    }

    if (price === undefined || typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'O preço é obrigatório e não pode ser negativo.' });
    }

    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ message: 'O estoque é obrigatório e deve ser um número válido.' });
    }

    const product = await Product.create(req.body);

    return res.status(201).json(product);
  }

  // MÉTODOS INTACTOS PARA O RESTO DA API FUNCIONAR
  async update(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }

    await product.update(req.body);

    return res.json(product);
  }

  async remove(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }

    await product.destroy();

    return res.status(204).send();
  }
}

export default new ProductController();