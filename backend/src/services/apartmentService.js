const Apartment = require('../database/models/Apartment');

async function createApartment(apartmentData) {
  try {
    const apartment = new Apartment(apartmentData);
    return await apartment.save();
  } catch (error) {
    throw error;
  }
}

module.exports = { createApartment };