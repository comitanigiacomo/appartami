const express = require('express');
const router = express.Router();
const stanzaController = require('../controllers/stanzaController')

router.post('/:hash/add-apartments', stanzaController.addApartments);

module.exports = router;
