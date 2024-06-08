const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/projeto-cidade-limpa').then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.log('Erro ao conectar ao MongoDB:', err);
});