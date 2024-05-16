const mongoose = require('mongoose');
const Stanza = require('./Stanza');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {type: String},
  stanza: [{type: Stanza }]
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;