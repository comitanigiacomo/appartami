const Preference = require('../database/models/Preference');

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
    const { userId, positivePreferences, negativePreferences } = req.body;

    // Controlla se l'utente ha già una preferenza
    const existingPreference = await Preference.findOne({ user: userId });
    if (existingPreference) {
      return res.status(400).json({ error: 'User already has a preference' });
    }
  
    // Verifica che il numero di preferenze non superi il limite massimo
    if (positivePreferences.length > 2 || negativePreferences.length > 2) {
      return res.status(400).json({ error: 'Too many preferences provided' });
    }

    // Crea un nuovo oggetto preferenza con l'ID dell'utente
    const newPreference = new Preference({
      user: userId,
      positivePreferences,
      negativePreferences
    });

    // Salva la nuova preferenza nel database
    await newPreference.save();
    res.status(201).json({ message: 'Preference added successfully', preference: newPreference });
  } catch (error) {
    console.error(error);
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


// Modifica le preferenze
exports.updatePreference = async (req, res) => {
  try {
    const { id } = req.params;
    const { positivePreferences, negativePreferences } = req.body;

    // Controlla che la preferenza esista
    const existingPreference = await Preference.findById(id);
    if (!existingPreference) {
      return res.status(404).json({ error: 'Preference not found' });
    }

    // Verifica che il numero di preferenze non superi il limite massimo
    if (positivePreferences.length > 2 || negativePreferences.length > 2) {
      return res.status(400).json({ error: 'Too many preferences provided' });
    }

    // Aggiorna le preferenze
    existingPreference.positivePreferences = positivePreferences;
    existingPreference.negativePreferences = negativePreferences;

    // Salva le modifiche nel database
    await existingPreference.save();

    res.status(200).json({ message: 'Preference updated successfully', preference: existingPreference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update preference' });
  }
};

