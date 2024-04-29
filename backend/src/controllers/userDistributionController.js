const User = require('../database/models/User');
const Preference = require('../database/models/Preference');
const Apartment = require('../database/models/Apartment');

exports.distribute = async (req, res) => {
    try {
        const users = await User.find().lean();
        const preferences = await Preference.find().populate('user').lean();
        let apartments = await Apartment.find().lean();

        let bestConfiguration = null;
        let bestScore = -Infinity;

        // Trova e assegna le coppie degli utenti che hanno la prima preferenza reciproca
        const couples = [];
        for (const user of users) {
            const userPreference = preferences.find(preference => preference.user.toString() === user._id.toString());
            if (userPreference && userPreference.positivePreferences.length > 0) {
                const otherUser = users.find(u => {
                    const uPreference = preferences.find(preference => preference.user.toString() === u._id.toString());
                    return uPreference && uPreference.positivePreferences[0] === user.username && userPreference.positivePreferences[0] === u.username;
                });
                if (otherUser) {
                    const couple = [user.username, otherUser.username];
                    couples.push(couple);
                    const apartment = apartments.find(apartment => apartment.name === userPreference.positivePreferences[0]);
                    if (apartment && apartment.people.length < apartment.numberOfBeds) {
                        apartment.people.push(...couple);
                    }
                }
            }
        }

        // Esegui 10.000 iterazioni
        for (let i = 0; i < 10000; i++) {
            // Svuota gli appartamenti
            for (const apartment of apartments) {
                apartment.people = [];
            }

            // Riempi gli appartamenti con le coppie predefinite
            for (const couple of couples) {
                const apartment = apartments.find(apartment => apartment.name === couple[0]);
                if (apartment && apartment.people.length < apartment.numberOfBeds) {
                    apartment.people.push(...couple);
                }
            }

            // Distribuisci gli utenti rimanenti negli appartamenti
            for (const user of users) {
                const randomApartment = apartments[Math.floor(Math.random() * apartments.length)];
                if (!randomApartment.people.includes(user.username) && randomApartment.people.length < randomApartment.numberOfBeds) {
                    randomApartment.people.push(user.username);
                }
            }

            // Calcola il punteggio medio degli appartamenti
            let totalScore = 0;
            for (const apartment of apartments) {
                let apartmentScore = 0;
                for (const occupant of apartment.people) {
                    const occupantPreference = preferences.find(preference => preference.user.toString() === users.find(u => u.username === occupant)._id.toString());
                    if (occupantPreference) {
                        if (occupantPreference.positivePreferences.includes(occupant)) {
                            apartmentScore += 5;
                        }
                        if (occupantPreference.negativePreferences.includes(occupant)) {
                            apartmentScore -= 1;
                        }
                    }
                }
                totalScore += apartmentScore;
            }

            // Calcola il punteggio medio
            const averageScore = totalScore;

            // Verifica se questa configurazione ha un punteggio medio migliore
            if (averageScore > bestScore) {
                bestScore = averageScore;
                bestConfiguration = JSON.parse(JSON.stringify(apartments)); // Copia profonda della configurazione
            }
        }

        // Prepara le operazioni di aggiornamento degli appartamenti
        const bulkUpdateOperations = bestConfiguration.map(apartment => ({
            updateOne: {
                filter: { _id: apartment._id },
                update: { people: apartment.people }
            }
        }));

        // Aggiorna gli appartamenti nel database con la migliore configurazione
        await Apartment.bulkWrite(bulkUpdateOperations);

        // Ottieni gli appartamenti aggiornati
        const updatedApartments = await Apartment.find().lean();

        // Invia la risposta contenente gli appartamenti popolati
        res.status(200).json({ message: 'User distribution completed successfully', apartments: updatedApartments });
    } catch (error) {
        console.error('Failed to distribute users:', error);
        res.status(500).json({ error: 'Failed to distribute users' });
    }
};
