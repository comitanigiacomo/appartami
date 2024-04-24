const Preference = require('../models/Preference');

// Ottiene le preferenze
exports.getPreferences = async (req, res) => {
  try {
    const preferences = await Preference.find();
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get preferences' });
  }
};

// Aggiunge nuove preferenze
exports.addPreference = async (req, res) => {
  try {
    const newPreference = new Preference(req.body);
    await newPreference.save();
    res.status(201).json({ message: 'Preference added successfully', preference: newPreference });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add preference' });
  }
};

// elimina le preferenze
exports.deletePreference = async (req, res) => {
  try {
    const { id } = req.params;
    await Preference.findByIdAndDelete(id);
    res.status(200).json({ message: 'Preference deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete preference' });
  }
};
