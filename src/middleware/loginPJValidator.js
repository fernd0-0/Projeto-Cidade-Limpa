const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require("../models/loginPJModel");
const LoginPJ = mongoose.model("loginpj");

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json({ error: "Precisa estar logado" });
  }
  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, "texto secreto");
    const { _id, email } = dados;
    
    const user = await LoginPJ.findById(_id);
    if (!user) return res.json({ error: 'Esse usuário não existe' });

    req.userId = _id;
    req.userEmail = email;
    return next();
    } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};

module.exports = loginRequired;
