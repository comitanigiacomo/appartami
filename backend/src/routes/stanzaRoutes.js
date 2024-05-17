const express = require('express');
const router = express.Router();
const addApartments = require('../controllers/addApartments');

router.post('/stanza/:hash/add-apartments', addApartments);

module.exports = router;
