const jwt = require('jsonwebtoken');
const Stanza = require('../database/models/Stanza');
const Apartment = require('../database/models/Apartment');
const User = require('../database/models/User');

exports.addApartments = async (req, res) => {
    try {
      const token = req.cookies.token;
  
      if (!token) {
        return res.status(401).json({ error: 'Token non fornito' });
      }
  
      const decodedToken = jwt.verify(token, 'appartami');
      const username = decodedToken.username;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'Utente non trovato' });
      }
  
      const { hash } = req.params;
  
      const stanza = await Stanza.findOne({ hash });
  
      if (!stanza) {
        return res.status(404).json({ error: 'Stanza non trovata' });
      }
  
      if (!stanza.owner.equals(user._id)) {
        return res.status(403).json({ error: 'Accesso non autorizzato' });
      }
  
      const { name, location, numberOfBeds } = req.body;
  
      const newApartment = new Apartment({
        name,
        location,
        numberOfBeds,
        people: []
      });
  
      await newApartment.save();
  
      stanza.apartments.push(newApartment._id);
      await stanza.save();
  
      res.status(200).json(stanza);
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli appartamenti alla stanza:', error);
      res.status(500).json({ error: 'Errore durante l\'aggiunta degli appartamenti alla stanza' });
    }
  };
  
  

exports.addPeopleToRoom = async (req, res) => {
    try {
        // Ottieni il token JWT dal cookie della richiesta
        const token = req.cookies.token;

        // Verifica se il token è presente
        if (!token) {
            return res.status(401).json({ error: 'Token non fornito' });
        }

        // Decodifica il token JWT per ottenere l'username
        const decodedToken = jwt.verify(token, 'appartami');
        const username = decodedToken.username;

        // Trova l'utente nel database tramite l'username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        // Ottieni il codice della stanza dalla richiesta
        const { hash } = req.params;

        // Trova la stanza nel database tramite il codice (hash)
        const stanza = await Stanza.findOne({ hash });

        if (!stanza) {
            return res.status(404).json({ error: 'Stanza non trovata' });
        }

        // Verifica se l'utente è il proprietario della stanza
        if (!stanza.owner.equals(user._id)) {
            return res.status(403).json({ error: 'Accesso non autorizzato' });
        }

        // Ottieni le persone dalla richiesta
        const { peopleIds } = req.body;

        // Verifica se i peopleIds sono forniti e sono un array
        if (!Array.isArray(peopleIds) || peopleIds.length === 0) {
            return res.status(400).json({ error: 'Nessuna persona fornita' });
        }

        // Verifica se tutte le persone esistono
        const people = await User.find({ _id: { $in: peopleIds } });

        if (people.length !== peopleIds.length) {
            return res.status(404).json({ error: 'Una o più persone non trovate' });
        }

        // Aggiungi le persone alla stanza
        stanza.people.push(...peopleIds);
        await stanza.save();

        // Restituisci la stanza aggiornata
        res.status(200).json(stanza);
    } catch (error) {
        console.error('Errore durante l\'aggiunta delle persone alla stanza:', error);
        res.status(500).json({ error: 'Errore durante l\'aggiunta delle persone alla stanza' });
    }
};

exports.removePeopleFromRoom = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Token non fornito' });
        }

        const decodedToken = jwt.verify(token, 'appartami');
        const username = decodedToken.username;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        const { hash } = req.params;
        const stanza = await Stanza.findOne({ hash });
        if (!stanza) {
            return res.status(404).json({ error: 'Stanza non trovata' });
        }

        const { peopleIds } = req.body;
        if (!Array.isArray(peopleIds) || peopleIds.length === 0) {
            return res.status(400).json({ error: 'Nessuna persona fornita' });
        }

        if (peopleIds.includes(user._id)) {
            return res.status(400).json({ error: 'Non puoi rimuovere te stesso dalla stanza' });
        }

        await Stanza.updateOne({ hash }, { $pull: { people: { $in: peopleIds } } });

        const updatedStanza = await Stanza.findOne({ hash }).populate('people');

        res.status(200).json(updatedStanza);
    } catch (error) {
        console.error('Errore durante la rimozione delle persone dalla stanza:', error);
        res.status(500).json({ error: 'Errore durante la rimozione delle persone dalla stanza' });
    }
};


exports.deleteRoom = async (req, res) => {
    try {
        // Ottieni il token JWT dal cookie della richiesta
        const token = req.cookies.token;

        // Verifica se il token è presente
        if (!token) {
            return res.status(401).json({ error: 'Token non fornito' });
        }

        // Decodifica il token JWT per ottenere l'username
        const decodedToken = jwt.verify(token, 'appartami');
        const username = decodedToken.username;

        // Trova l'utente nel database tramite l'username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        // Ottieni il codice della stanza dalla richiesta
        const { hash } = req.params;

        // Trova la stanza nel database tramite il codice (hash)
        const stanza = await Stanza.findOne({ hash });

        if (!stanza) {
            return res.status(404).json({ error: 'Stanza non trovata' });
        }

        // Verifica se l'utente è il proprietario della stanza
        if (!stanza.owner.equals(user._id)) {
            return res.status(403).json({ error: 'Accesso non autorizzato' });
        }

        // Elimina la stanza
        await Stanza.deleteOne({ hash });

        // Restituisci un messaggio di successo
        res.status(200).json({ message: 'Stanza eliminata con successo' });
    } catch (error) {
        console.error('Errore durante l\'eliminazione della stanza:', error);
        res.status(500).json({ error: 'Errore durante l\'eliminazione della stanza' });
    }
};

exports.getRoomParticipants = async (req, res) => {
    try {
        // Ottieni il token JWT dal cookie della richiesta
        const token = req.cookies.token;

        // Verifica se il token è presente
        if (!token) {
            return res.status(401).json({ error: 'Token non fornito' });
        }

        // Decodifica il token JWT per ottenere l'username
        const decodedToken = jwt.verify(token, 'appartami');
        const username = decodedToken.username;

        // Trova l'utente nel database tramite l'username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        // Ottieni il codice della stanza dalla richiesta
        const { hash } = req.params;

        // Trova la stanza nel database tramite il codice (hash)
        const stanza = await Stanza.findOne({ hash }).populate('people');

        if (!stanza) {
            return res.status(404).json({ error: 'Stanza non trovata' });
        }

        // Verifica se l'utente è il proprietario della stanza
        if (!stanza.owner.equals(user._id)) {
            return res.status(403).json({ error: 'Accesso non autorizzato' });
        }

        // Restituisci i partecipanti della stanza
        res.status(200).json({ participants: stanza.people });
    } catch (error) {
        console.error('Errore durante il recupero dei partecipanti della stanza:', error);
        res.status(500).json({ error: 'Errore durante il recupero dei partecipanti della stanza' });
    }
};

exports.deleteApartmentFromRoom = async (req, res) => {
    try {
        // Ottieni il token JWT dal cookie della richiesta
        const token = req.cookies.token;

        // Verifica se il token è presente
        if (!token) {
            return res.status(401).json({ error: 'Token non fornito' });
        }

        // Decodifica il token JWT per ottenere l'username
        const decodedToken = jwt.verify(token, 'appartami');
        const username = decodedToken.username;

        // Trova l'utente nel database tramite l'username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        // Ottieni il codice della stanza e l'ID dell'appartamento dalla richiesta
        const { hash, apartmentId } = req.params;

        // Trova la stanza nel database tramite il codice (hash)
        const stanza = await Stanza.findOne({ hash }).populate('apartments');

        if (!stanza) {
            return res.status(404).json({ error: 'Stanza non trovata' });
        }

        // Verifica se l'utente è il proprietario della stanza
        if (!stanza.owner.equals(user._id)) {
            return res.status(403).json({ error: 'Accesso non autorizzato' });
        }

        // Verifica se l'appartamento è presente nella stanza
        const apartmentIndex = stanza.apartments.findIndex(apartment => apartment._id.equals(apartmentId));
        if (apartmentIndex === -1) {
            return res.status(404).json({ error: 'Appartamento non trovato nella stanza' });
        }

        // Rimuovi l'appartamento dalla stanza
        stanza.apartments.splice(apartmentIndex, 1);
        await stanza.save();

        // Rimuovi l'appartamento dal database
        await Apartment.findByIdAndDelete(apartmentId);

        // Restituisci la stanza aggiornata
        res.status(200).json(stanza);
    } catch (error) {
        console.error('Errore durante l\'eliminazione dell\'appartamento dalla stanza:', error);
        res.status(500).json({ error: 'Errore durante l\'eliminazione dell\'appartamento dalla stanza' });
    }
};

exports.getPeopleFromApartment = async (req, res) => {
    try {
        // Ottieni il token JWT dal cookie della richiesta
        const token = req.cookies.token;

        // Verifica se il token è presente
        if (!token) {
            return res.status(401).json({ error: 'Token non fornito' });
        }

        // Decodifica il token JWT per ottenere l'username
        const decodedToken = jwt.verify(token, 'appartami');
        const username = decodedToken.username;

        // Trova l'utente nel database tramite l'username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        // Ottieni l'ID dell'appartamento dalla richiesta
        const { apartmentId } = req.params;

        // Trova l'appartamento nel database tramite l'ID
        const apartment = await Apartment.findById(apartmentId).populate('people');

        if (!apartment) {
            return res.status(404).json({ error: 'Appartamento non trovato' });
        }

        // Restituisci le persone all'interno dell'appartamento
        res.status(200).json(apartment.people);
    } catch (error) {
        console.error('Errore durante il recupero delle persone dall\'appartamento:', error);
        res.status(500).json({ error: 'Errore durante il recupero delle persone dall\'appartamento' });
    }
};


