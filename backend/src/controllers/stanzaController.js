const jwt = require('jsonwebtoken');
const Stanza = require('../database/models/Stanza');
const Apartment = require('../database/models/Apartment');
const User = require('../database/models/User');

exports.addApartments = async (req, res) => {
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

    // Ottieni gli appartamenti dalla richiesta
    const { apartmentIds } = req.body;

    // Verifica se gli apartmentIds sono forniti e sono un array
    if (!Array.isArray(apartmentIds) || apartmentIds.length === 0) {
      return res.status(400).json({ error: 'Nessun appartamento fornito' });
    }

    // Verifica se tutti gli appartamenti esistono
    const apartments = await Apartment.find({ _id: { $in: apartmentIds } });

    if (apartments.length !== apartmentIds.length) {
      return res.status(404).json({ error: 'Uno o più appartamenti non trovati' });
    }

    // Aggiungi gli appartamenti alla stanza
    stanza.apartments.push(...apartmentIds);
    await stanza.save();

    // Restituisci la stanza aggiornata
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
