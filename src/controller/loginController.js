const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/loginModel");
const Login = mongoose.model("login");
const jwt = require("jsonwebtoken");
const loginValidator = require('../middleware/loginValidator');

router.post('/create', async (req, res) => {
  const cleanUpResult = cleanUp(req.body);

  if (typeof (cleanUpResult) == 'array') return res.json({ error: cleanUpResult[0] });

  const login = new Login();

  await login.create(cleanUpResult);
});

router.post('/login', async (req, res) => {
  const login = new Login();

  if (!req.body.email) return res.json({ error: "É nececssario email para entrar" });

  await login.findOne({ email: req.body.email });

  if (req.body.password != login._password) return res.json({ error: "Senha errada" });

  const { _id, email } = login;

  const token = jwt.sign({ _id, email }, "texto secreto", { expiresIn: "1d" });

  return res.json({ response: token });
});

router.post('/update', loginValidator, async (req, res) => {
  const idToken = JSON.parse(JSON.stringify(req.userId));

  if (!idToken) return res.json({ error: "Precisa estar logado" });

  const cleanUpResult = cleanUp(req.body);

  if (typeof (cleanUpResult) == 'array') return res.json({ error: cleanUpResult[0] });

  const login = new Login();

  await login.findOne({ email: req.body.email });

  if (login) if ("" + login._id != idToken) return res.json({ error: 'Esse email ja tem dono' });

  await login.findByIdAndUpdate(idToken, {
    nome: req.body.nome,
    email: req.body.email,
    password: req.body.password,
    contact_number: req.body.contact_number
  });

  if (!login) return req.errors.push('Usuário não existe');
});

router.post('/delete', loginValidator, async (req, res) => {
  const idToken = JSON.parse(JSON.stringify(req.userId));

  const login = new Login();

  await login.deleteMany({ _id: req.body.id });
});

const cleanUp = (body) => {

  for (const key in body) {
    if (typeof body[key] !== 'string') {
      return [`O campo ${[key]} precisa estar preenchido`];
    }
  }

  const bodyReturn = {
    email: body.email,
    password: body.password,
    name: body.name,
    address: body.address ? body.address : ""
  };

  return bodyReturn
}

module.exports = router;