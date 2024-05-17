const jwt = require('jsonwebtoken');
const Stanza = require('../database/models/Stanza');
const Apartment = require('../database/models/Apartment');
const User = require('../database/models/User');

const addApartments = async (req, res) => {
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

module.exports = addApartments;
