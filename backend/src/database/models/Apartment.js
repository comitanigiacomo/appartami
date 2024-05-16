const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema separately

const apartmentSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  numberOfBeds: { type: Number, required: true }, // Corrected field definition
  people: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Corrected referencing to User model
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
