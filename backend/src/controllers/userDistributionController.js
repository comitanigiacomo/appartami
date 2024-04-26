const User = require('../database/models/User');
const Preference = require('../database/models/Preference');
const Apartment = require('../database/models/Apartment');

// Funzione per distribuire gli utenti negli appartamenti
exports.distribute = async (req, res) => {
    try {
        // Ottieni tutti gli utenti e le preferenze
        const users = await User.find();
        const preferences = await Preference.find().populate('user');
        const apartments = await Apartment.find();

        // Inizializza una mappa per tenere traccia degli appartamenti e dei loro occupanti
        const apartmentOccupantsMap = new Map(apartments.map(apartment => [apartment._id.toString(), []]));

        // Distribuisci gli utenti negli appartamenti
        let allUsersDistributed = false;

        console.log('Starting user distribution...');

        while (!allUsersDistributed) {
            console.log('Inside user distribution loop...');

            allUsersDistributed = true;

            for (const user of users) {
                // Trova le preferenze dell'utente corrente
                const userPreference = preferences.find(preference => preference.user.toString() === user._id.toString());

                // Verifica se l'utente è già stato distribuito
                const isUserDistributed = [...apartmentOccupantsMap.values()].flat().includes(user.username);

                // Se l'utente ha preferenze e non è già stato distribuito, distribuiscilo in base ad esse
                if (userPreference && !isUserDistributed) {
                    // Logica di distribuzione degli utenti...
                    const { positivePreferences, negativePreferences } = userPreference;
                    const positiveApartments = apartments.filter(apartment => positivePreferences.some(preference => apartment.people.includes(preference)));
                    const negativeApartments = apartments.filter(apartment => negativePreferences.some(preference => apartment.people.includes(preference)));

                    // Filtra gli appartamenti basati sulle preferenze negative
                    const filteredApartments = positiveApartments.filter(apartment => !negativeApartments.includes(apartment));

                    if (filteredApartments.length > 0) {
                        // Scegli casualmente un appartamento tra quelli filtrati
                        const selectedApartment = filteredApartments[Math.floor(Math.random() * filteredApartments.length)];

                        // Verifica se l'appartamento ha ancora posti letto disponibili
                        if (apartmentOccupantsMap.get(selectedApartment._id.toString()).length < selectedApartment.numberOfBeds) {
                            // Assegna l'utente all'appartamento selezionato
                            apartmentOccupantsMap.get(selectedApartment._id.toString()).push(user.username);
                        } else {
                            allUsersDistributed = false;
                        }
                    } else {
                        allUsersDistributed = false;
                    }
                } else if (!isUserDistributed) {
                    // Se l'utente non ha preferenze e non è già stato distribuito, assegnalo casualmente a un appartamento
                    // Logica di assegnazione casuale degli utenti...
                    const randomApartment = apartments[Math.floor(Math.random() * apartments.length)];

                    // Verifica se l'appartamento ha ancora posti letto disponibili
                    if (apartmentOccupantsMap.get(randomApartment._id.toString()).length < randomApartment.numberOfBeds) {
                        // Assegna l'utente all'appartamento selezionato
                        apartmentOccupantsMap.get(randomApartment._id.toString()).push(user.username);
                    } else {
                        allUsersDistributed = false;
                    }
                }
            }

            // Verifica se tutti gli utenti sono stati distribuiti correttamente
            if (allUsersDistributed) {
                break;
            }
        }

        console.log('Finished user distribution loop iteration.');

        // Aggiorna gli appartamenti nel database con i nuovi occupanti
        for (const [apartmentId, occupants] of apartmentOccupantsMap.entries()) {
            await Apartment.findByIdAndUpdate(apartmentId, { people: occupants });
        }

        console.log('User distribution completed successfully');

        // Ottieni gli appartamenti aggiornati
        const updatedApartments = await Apartment.find();

        // Invia la risposta contenente gli appartamenti popolati
        res.status(200).json({ message: 'User distribution completed successfully', apartments: updatedApartments });
    } catch (error) {
        console.error('Failed to distribute users:', error);
        res.status(500).json({ error: 'Failed to distribute users' });
    }
};
