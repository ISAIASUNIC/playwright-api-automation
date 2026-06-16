import jwt from 'jsonwebtoken';
import User from '../models/user.js';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Usuário não encontrado'
      });
    }

    const passwordMatched = await user.checkPassword(password);

    if (!passwordMatched) {
      return res.status(401).json({
        message: 'Senha incorreta'
      });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token: jwt.sign(
        { id: user.id },
        'agentemoda-secret',
        {
          expiresIn: '7d'
        }
      )
    });
  }
}

export default new SessionController();