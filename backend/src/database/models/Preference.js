const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  positivePreferences: [{ type: String }],
  negativePreferences: [{ type: String }],
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
