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

        // Mantieni traccia degli utenti che non sono ancora stati distribuiti
        let remainingUsers = [...users];

        while (!allUsersDistributed) {
            allUsersDistributed = true;

            // Loop su tutti gli utenti rimanenti
            for (const user of remainingUsers) {
                // Verifica se l'utente è già stato distribuito
                const isUserDistributed = [...apartmentOccupantsMap.values()].flat().includes(user.username);

                // Se l'utente non è ancora stato distribuito, assegnalo
                if (!isUserDistributed) {
                    // Trova le preferenze dell'utente corrente
                    const userPreference = preferences.find(preference => preference.user.toString() === user._id.toString());

                    // Trova altri utenti con preferenza reciproca
                    const mutualPreferenceUsers = remainingUsers.filter(u => {
                        const uPreference = preferences.find(preference => preference.user.toString() === u._id.toString());
                        return uPreference && uPreference.positivePreferences[0] === user.username && userPreference.positivePreferences[0] === u.username;
                    });

                    // Se ci sono preferenze reciproche, assegna gli utenti allo stesso appartamento
                    if (mutualPreferenceUsers.length > 0) {
                        for (const mutualUser of mutualPreferenceUsers) {
                            const mutualPreferenceApartment = [...apartmentOccupantsMap.entries()].find(([_, occupants]) => occupants.some(occupant => {
                                const occupantPreference = preferences.find(preference => preference.user.toString() === users.find(u => u.username === occupant)._id.toString());
                                return occupantPreference && occupantPreference.positivePreferences[0] === mutualUser.username;
                            }));
                            if (mutualPreferenceApartment) {
                                apartmentOccupantsMap.get(mutualPreferenceApartment[0]).push(mutualUser.username);
                            } else {
                                allUsersDistributed = false;
                                break;
                            }
                        }
                    } else {
                        // Trova l'appartamento con il minor numero di non preferenze, o in caso di parità, uno casuale
                        let selectedApartment = null;
                        let minNonPreferencesCount = Infinity;

                        for (const apartment of apartments) {
                            const nonPreferencesCount = apartment.people.reduce((count, occupant) => {
                                const occupantPreference = preferences.find(preference => preference.user.toString() === users.find(u => u.username === occupant)._id.toString());
                                return occupantPreference ? count + occupantPreference.negativePreferences.filter(preference => user.username === preference || userPreference.negativePreferences.includes(preference)).length : count;
                            }, 0);

                            if (nonPreferencesCount < minNonPreferencesCount) {
                                selectedApartment = apartment;
                                minNonPreferencesCount = nonPreferencesCount;
                            } else if (nonPreferencesCount === minNonPreferencesCount && Math.random() < 0.5) {
                                selectedApartment = apartment;
                            }
                        }

                        // Verifica se l'appartamento ha ancora posti letto disponibili
                        if (selectedApartment && apartmentOccupantsMap.get(selectedApartment._id.toString()).length < selectedApartment.numberOfBeds) {
                            // Assegna l'utente all'appartamento selezionato
                            apartmentOccupantsMap.get(selectedApartment._id.toString()).push(user.username);
                        } else {
                            // Se non è possibile assegnare l'utente all'appartamento desiderato, gestisci la situazione
                            // come descritto nelle specifiche
                            // ...
                        }
                    }

                    // Rimuovi l'utente dall'array degli utenti rimanenti solo se è stato distribuito
                    if ([...apartmentOccupantsMap.values()].flat().includes(user.username)) {
                        remainingUsers = remainingUsers.filter(u => u.username !== user.username);
                    }
                }
            }

            // Verifica se ci sono ancora utenti rimanenti da distribuire
            if (remainingUsers.length > 0) {
                allUsersDistributed = false;
            }
        }

        console.log('Finished user distribution loop.');

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
