const express = require('express');
const router = express.Router();

const preferenceController = require('../controllers/preferenceController');

router.get('/', preferenceController.getAllPreferences);
router.get('/:id', preferenceController.getPreferenceById);
router.post('/', preferenceController.createPreference);
router.put('/:id', preferenceController.updatePreference);
router.delete('/:id', preferenceController.deletePreference);

module.exports = router;
