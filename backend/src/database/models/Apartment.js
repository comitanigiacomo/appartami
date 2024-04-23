const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  numberOfBeds: {type: int, required: true}
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
