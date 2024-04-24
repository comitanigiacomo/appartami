const express = require('express');
const router = express.Router();
const PreferenceController = require('../controllers/PreferenceController');

router.get('/', PreferenceController.getPreferences);
router.post('/', PreferenceController.addPreference);
router.delete('/:id', PreferenceController.deletePreference);

module.exports = router;
