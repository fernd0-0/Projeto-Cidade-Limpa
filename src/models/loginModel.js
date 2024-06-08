const mongoose = require('mongoose');

const Login = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact_number: { type: String, required: false, default: "" }
});

mongoose.model('login', Login);


