const express = require('express');
const router = express.Router();
const ApartmentController = require('../controllers/apartmentController');

// Ottiene tutti gli appartamenti
router.get('/get', ApartmentController.getAllApartments);

// Ottiene un appartamento per ID
router.get('/get/:id', ApartmentController.getApartmentById);

// Aggiunge un nuovo appartamento
router.post('/create', ApartmentController.createApartment);

// Aggiorna un appartamento
router.put('/update/:id', ApartmentController.updateApartment);

// Elimina un appartamento
router.delete('/delete/:id', ApartmentController.deleteApartment);

// Aggiorna tutti gli appartamenti
router.put('/updateAll', ApartmentController.updateApartments);

module.exports = router;
