const express = require('express');
const router = express.Router();
const stanzaController = require('../controllers/stanzaController')

router.post('/:hash/add-apartments', stanzaController.addApartments);

// Definisci la route per aggiungere persone alla stanza
router.post('/:hash/people', stanzaController.addPeopleToRoom);

module.exports = router;
