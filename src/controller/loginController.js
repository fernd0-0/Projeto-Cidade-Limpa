const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/loginModel");
const Login = mongoose.model("login");
const jwt = require("jsonwebtoken");
const loginValidator = require('../middleware/loginValidator');

router.post('/create', async (req, res) => {
  const cleanUpResult = cleanUp(req.body);

  if (cleanUpResult) return res.json({ error: cleanUpResult[0] });

  let login = await Login.findOne({ email: req.body.email });

  if (login) return res.json({ error: "Esse email já esta sendo utilizado" });

  login = await Login.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address
  });

  if(!login) return res.json({ error: "Erro de conexão ao banco" });

  console.log("Criou");
  return res.json({ response: "Conta criada com sucesso" });
});

router.post('/login', async (req, res) => {
  if (!req.body.email) return res.json({ error: "É nececssario email para entrar" });

  let login = await Login.findOne({ email: req.body.email });

  if(!login) return res.json({ error: "Erro de conexão ao banco" })

  if (req.body.password != login.password) return res.json({ error: "Senha errada" });

  const { _id, email } = login;

  const token = jwt.sign({ _id, email }, "texto secreto", { expiresIn: "1d" });

  console.log("Entrou")
  return res.json({ response: token });
});

router.put('/update', loginValidator, async (req, res) => {
  const cleanUpResult = cleanUp(req.body);
  
  if (cleanUpResult) return res.json({ error: cleanUpResult[0] });

  const idToken = JSON.parse(JSON.stringify(req.userId));

  if (!idToken) return res.json({ error: "Precisa estar logado" });

  let login = await Login.findOne({ email: req.body.email });

  if (login) if ("" + login._id != idToken) return res.json({ error: 'Esse email ja tem dono' });

  login = await Login.findByIdAndUpdate(idToken, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address
  });

  if(!login) return res.json({ error: "Erro de conexão ao banco" })

  return res.json({ response: "Conta atualizada com sucesso" });
});

router.delete('/delete', loginValidator, async (req, res) => {
  const idToken = JSON.parse(JSON.stringify(req.userId));

  if(!idToken) return res.json({ error: "Você não está logado"});

  const login = await Login.deleteMany({ _id: idToken });

  if(!login) return res.json({ error: "Erro de conexão ao banco" })

  return res.json({ response: "Conta excluida com sucesso" });
});

const cleanUp = (body) => {
  if (!body.email) return ["Email é um capo obrigatório"];
  if (!body.name) return ["Name é um capo obrigatório"];
  if (!body.password) return ["password é um capo obrigatório"];
  if (!body.address) return ["address é um capo obrigatório"];
}

module.exports = router;