const cors = require('cors');
require('./src/models/db.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRouter = require('./src/controller/loginController.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas
app.use('/login', loginRouter);
app.use('/signin', signinRouter)

const PORT = 8081;
app.listen(PORT , () => {
  console.log('Servidor Rodando');
});




