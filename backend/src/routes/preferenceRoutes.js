const express = require('express');
const router = express.Router();
const PreferenceController = require('../controllers/PreferenceController');

// Ottiene le preferenze
router.get('/', PreferenceController.getPreferences);

// Aggiunge una nuova preferenza
router.post('/', PreferenceController.addPreference);

// Elimina una preferenza
router.delete('/:id', PreferenceController.deletePreference);

module.exports = router;
