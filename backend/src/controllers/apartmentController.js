const Apartment = require('../database/models/Apartment');

// Ottieni tutti gli appartamenti
const getAllApartments = async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Ottieni un appartamento per ID
const getApartmentById = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (!apartment) {
            return res.status(404).json({ message: 'Apartment not found' });
        }
        res.json(apartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crea un nuovo appartamento
const createApartment = async (req, res) => {
    const {name, location, numberOfBeds } = req.body;
    const newApartment = new Apartment({
        name,
        location,
        numberOfBeds
    });

    try {
        const savedApartment = await newApartment.save();
        res.status(201).json(savedApartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Aggiorna un appartamento
const updateApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedApartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedApartment) {
            return res.status(404).json({ message: 'Apartment not found' });
        }
        res.json(updatedApartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Cancella un appartamento
const deleteApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedApartment = await Apartment.findByIdAndDelete(id);
        if (!deletedApartment) {
            return res.status(404).json({ message: 'Apartment not found' });
        }
        res.json({ message: 'Apartment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllApartments,
    getApartmentById,
    createApartment,
    updateApartment,
    deleteApartment
};
