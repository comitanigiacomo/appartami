const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  positivePreferences: [{ type: String, maxlength: 100 }], // Add maxlength validation
  negativePreferences: [{ type: String, maxlength: 100 }] // Add maxlength validation
});

// Add validation for array length
preferenceSchema.path('positivePreferences').validate(arrayLimit, 'Too many positive preferences provided');
preferenceSchema.path('negativePreferences').validate(arrayLimit, 'Too many negative preferences provided');

function arrayLimit(val) {
  return val.length <= 2;
}

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
