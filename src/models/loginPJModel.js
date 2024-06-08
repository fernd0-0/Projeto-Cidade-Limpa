const mongoose = require('mongoose');

const LoginPJ = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  car_data: { type: String, required: true }
});

mongoose.model('loginpj', LoginPJ);


