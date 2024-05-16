const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stanzaSchema = new Schema({
    hash: { type: String, required: true, unique: true },
    apartments: [{ type: Schema.Types.ObjectId, ref: 'Apartment' }],
    people: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  });

const Stanza = mongoose.model('Stanza', stanzaSchema);

module.exports = Stanza;
