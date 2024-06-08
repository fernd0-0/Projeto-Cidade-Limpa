const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const rota_tarefas = require('./controller/tarefasController');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Remanejando Rotas de tarefas
app.use('/login ', rota_tarefas);
const PORT = 8081;
app.listen(PORT, () => {
  console.log('Servidor Rodando');
});
