const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stanzaSchema = new Schema({
    codice: { type: String, required: true },
    appartamenti: [{ type: Schema.Types.ObjectId, ref: 'Apartment' }], // Correctly define array of ObjectId
    people: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Correctly define array of ObjectId
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Add required: true
});

const Stanza = mongoose.model('Stanza', stanzaSchema);

module.exports = Stanza;
