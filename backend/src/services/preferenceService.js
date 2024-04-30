const Preference = require('../database/models/Preference');

async function createPreference(preferenceData) {
  try {
    const preference = new Preference(preferenceData);
    return await preference.save();
  } catch (error) {
    throw error;
  }
}

module.exports = { createPreference };