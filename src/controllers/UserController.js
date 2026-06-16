import User from '../models/user.js';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userExists) {
      return res.status(400).json({
        message: 'Usuário já existe'
      });
    }

    const user = await User.create(req.body);

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }
}

export default new UserController();