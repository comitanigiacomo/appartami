const { UUID } = require('mongodb');
const mongoose = require('mongoose');
const Apartment = require('./Apartment');
const User = require('./User');

const stanzaSchema = new mongoose.Schema({
    codice: { type: UUID, required: true },
    appartamenti: {type: Apartment},
    people : [{ type: User }]
  });

  const Stanza = mongoose.model('Stanza', stanzaSchema);

  module.exports = Stanza;
  