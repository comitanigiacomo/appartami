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
    const {name, location, numberOfBeds, people } = req.body;
    const newApartment = new Apartment({
        name,
        location,
        numberOfBeds,
        people
    });

    try {
        const savedApartment = await newApartment.save();
        res.status(201).json(savedApartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Aggiorna le persone all'interno di un appartamento
const updateApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { people } = req.body;

        // Trova l'appartamento per ID e aggiorna solo il campo delle persone
        const updatedApartment = await Apartment.findByIdAndUpdate(
            id,
            { people: people },
            { new: true }
        );

        if (!updatedApartment) {
            return res.status(404).json({ message: 'Apartment not found' });
        }

        res.json(updatedApartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const updateApartments = async (req, res) => {
    try {
        const { people } = req.body;

        // Aggiorna tutti gli appartamenti nel sistema con il numero di persone fornito
        const result = await Apartment.updateMany({}, { people: people });

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'No apartments found' });
        }

        res.json({ message: 'All apartments updated successfully' });
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
    updateApartments,
    deleteApartment
};
