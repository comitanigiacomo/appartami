const { UUID } = require('mongodb');
const mongoose = require('mongoose');
const Apartment = require('./Apartment');
const User = require('./User');

const stanzaSchema = new mongoose.Schema({
    codice: { type: String, required: true },
    appartamenti: {type: Apartment},
    people : [{ type: User }],
    owner : {type: User}
  });

  const Stanza = mongoose.model('Stanza', stanzaSchema);

  module.exports = Stanza;
  