const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stanzaSchema = new mongoose.Schema({
    codice: { type: String, required: true },
    appartamenti: [{ type: Schema.Types.ObjectId, ref: 'Apartment' }],
    people: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Changed to array of ObjectId
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Added required true
});

const Stanza = mongoose.model('Stanza', stanzaSchema);

module.exports = Stanza;
