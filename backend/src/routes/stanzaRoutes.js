const express = require('express');
const router = express.Router();
const stanzaController = require('../controllers/stanzaController')

router.post('/:hash/add-apartments', stanzaController.addApartments);

// Definisci la route per aggiungere persone alla stanza
router.post('/:hash/people', stanzaController.addPeopleToRoom);

// Definizione della route per eliminare una stanza
router.delete('/:hash/delete', stanzaController.deleteRoom);

//Route che ritorna i partecipanti della stanza
router.get('/:hash/participants', stanzaController.getRoomParticipants);


// Route per eliminare un appartamento dalla stanza
router.delete('/:hash/delete-apartment/:apartmentId', stanzaController.deleteApartmentFromRoom);

// Route per ottenere le persone da un appartamento
router.get('/apartment/:apartmentId/people', stanzaController.getPeopleFromApartment);

//Route per rimuovere persone dalla stanza
router.delete('/:hash/removePeople', stanzaController.removePeopleFromRoom);


module.exports = router;
