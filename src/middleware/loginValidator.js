const jwt = require('jsonwebtoken');
require("../models/loginModel");
const Login = mongoose.model("login");

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json({ error: "Precisa estar logado" });
  }
  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = new Login();
    await user.findById({ id: id });
    if (!user) return res.json({ error: 'Esse usuário não existe' });

    req.userId = id;
    req.userEmail = email;
    return next();
    } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};

module.exports = loginRequired;
