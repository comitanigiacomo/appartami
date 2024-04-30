const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  numberOfBeds: {type: Number, required: true},
  people : [{ type: String }]
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
