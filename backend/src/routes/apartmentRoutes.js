const express = require('express');
const router = express.Router();
const ApartmentController = require('../controllers/apartmentController');

// Ottiene tutti gli appartamenti
router.get('/', ApartmentController.getAllApartments);

// Ottiene un appartamento per ID
router.get('/:id', ApartmentController.getApartmentById);

// Aggiunge un nuovo appartamento
router.post('/', ApartmentController.createApartment);

// Aggiorna un appartamento
router.put('/:id', ApartmentController.updateApartment);

// Elimina un appartamento
router.delete('/:id', ApartmentController.deleteApartment);

module.exports = router;
