const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importa il modulo jsonwebtoken
const Stanza = require('../database/models/Stanza');
const Hashids = require('hashids/cjs'); // Importa il modulo hashids


// Controller per la registrazione degli utenti
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se l'utente esiste già nel database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuovo utente con la password hashata
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Invia una risposta di conferma con il token
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};


// Elimina un utente
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Restituisce tutti gli utenti
exports.getUsers = async (req, res) => {
  try {
    // Ottieni tutti gli utenti dal database
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


exports.getUserByUsername = async (req, res) => {
  try {
      // Ottieni il token JWT dal cookie della richiesta
      const token = req.cookies.token;

      // Estrai direttamente l'username dal payload del token JWT
      const decodedToken = jwt.verify(token, 'appartami');
      const username = decodedToken.username;

      // Cerca l'utente nel database tramite l'username
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ error: 'Utente non trovato' });
      }

      // Restituisci le informazioni dell'utente
      res.status(200).json(user);

  } catch (error) {
      console.error('Errore durante il recupero delle informazioni dell\'utente:', error);
      res.status(500).json({ error: 'Errore durante il recupero delle informazioni dell\'utente' });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    // Ottieni il token JWT dal cookie della richiesta
    const token = req.cookies.token;

    // Estrai direttamente l'username dal payload del token JWT
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Cerca l'utente nel database tramite l'username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Aggiorna l'email dell'utente con la nuova email fornita nella richiesta
    user.email = req.body.email; // Assicurati che il client includa il campo 'email' nella richiesta

    // Salva le modifiche nell'utente
    await user.save();

    // Restituisci le informazioni aggiornate dell'utente
    res.status(200).json(user);
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'email dell\'utente:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'email dell\'utente' });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    // Ottieni il token JWT dal cookie della richiesta
    const token = req.cookies.token;

    // Estrai direttamente l'username dal payload del token JWT
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Cerca l'utente nel database tramite l'username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Aggiorna lo username dell'utente con il nuovo username fornito nella richiesta
    user.username = req.body.username; // Assicurati che il client includa il campo 'username' nella richiesta

    // Salva le modifiche nell'utente
    await user.save();

    // Restituisci le informazioni aggiornate dell'utente
    res.status(200).json(user);
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dello username dell\'utente:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dello username dell\'utente' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    // Ottieni il token JWT dal cookie della richiesta
    const token = req.cookies.token;

    // Estrai direttamente l'username dal payload del token JWT
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Cerca l'utente nel database tramite l'username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Hash della nuova password
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10); // Assicurati che il client includa il campo 'newPassword' nella richiesta

    // Aggiorna la password dell'utente con la nuova password hashata
    user.password = hashedPassword;

    // Salva le modifiche nell'utente
    await user.save();

    // Restituisci le informazioni aggiornate dell'utente
    res.status(200).json(user);
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della password dell\'utente:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento della password dell\'utente' });
  }
};

exports.createStanza = async (req, res) => {
  try {
    // Ottieni il token JWT dal cookie della richiesta
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Token non fornito' });
    }

    // Estrai direttamente l'username dal payload del token JWT
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Cerca l'utente nel database tramite l'username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Crea codice univoco per la stanza
    const hashids = new Hashids('appartami', 8);
    const hash = hashids.encode(Date.now());

    const { name } = req.body;
    const apartments = [];
    const people = [user.id];

    // Crea una nuova stanza
    const newStanza = new Stanza({
      hash,// Utilizziamo il codice come hash
      name,
      apartments,
      people,
      owner: user._id
    });

    await newStanza.save();

    // Restituisci le informazioni aggiornate della stanza
    res.status(201).json(newStanza); // Usare 201 per la creazione

  } catch (error) {
    console.error('Errore durante la creazione della stanza:', error);
    res.status(500).json({ error: 'Errore durante la creazione della stanza' });
  }
};


exports.insertApartmentsInStanza = async (req, res) => {
  try {
    // Get the JWT token from the request cookies
    const token = req.cookies.token;

    // Decode the JWT token to extract the username
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Find the user in the database by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the room (stanza) by ID from the request body
    const { stanzaId, apartmentIds } = req.body;

    const stanza = await Stanza.findById(stanzaId);

    if (!stanza) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check if the user is the owner of the room
    if (stanza.owner.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'User is not the owner of the room' });
    }

    // Ensure the apartments exist
    const apartmentExists = await Apartment.find({ '_id': { $in: apartmentIds } });
    if (apartmentExists.length !== apartmentIds.length) {
      return res.status(400).json({ error: 'One or more apartments do not exist' });
    }

    // Add apartments to the room
    stanza.appartamenti.push(...apartmentIds);

    await stanza.save();

    // Return the updated room
    res.status(200).json(stanza);
  } catch (error) {
    console.error('Error adding apartments to room:', error);
    res.status(500).json({ error: 'Error adding apartments to room' });
  }
};

exports.insertPeopleInStanza = async (req, res) => {
  try {
    // Get the JWT token from the request cookies
    const token = req.cookies.token;

    // Decode the JWT token to extract the username
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Find the user in the database by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the room (stanza) by ID from the request body
    const { stanzaId, peopleIds } = req.body;

    const stanza = await Stanza.findById(stanzaId);

    if (!stanza) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check if the user is the owner of the room
    if (stanza.owner.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'User is not the owner of the room' });
    }

    // Ensure the people exist
    const peopleExist = await User.find({ '_id': { $in: peopleIds } });
    if (peopleExist.length !== peopleIds.length) {
      return res.status(400).json({ error: 'One or more people do not exist' });
    }

    // Add people to the room
    stanza.people.push(...peopleIds);

    await stanza.save();

    // Return the updated room
    res.status(200).json(stanza);
  } catch (error) {
    console.error('Error adding people to room:', error);
    res.status(500).json({ error: 'Error adding people to room' });
  }
};

// Restituisce tutte le stanze di cui fa parte un utente, comprese quelle di cui è owner 
exports.getUserStanze = async (req, res) => {
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

    // Trova tutte le stanze in cui l'utente è owner o membro e popola il campo 'owner' con i dettagli dell'utente
    const stanze = await Stanza.find({
      $or: [
        { owner: user._id },
        { people: user._id }
      ]
    }) // Popola il campo 'name' della stanza

    // Restituisci l'elenco delle stanze trovate
    res.status(200).json(stanze);
  } catch (error) {
    console.error('Errore durante il recupero delle stanze dell\'utente:', error);
    res.status(500).json({ error: 'Errore durante il recupero delle stanze dell\'utente' });
  }
};



// Dato il codice di una stanza, la restituisce
exports.getStanzaByHash = async (req, res) => {
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
    const stanza = await Stanza.findOne({ hash }).populate('apartments people owner');

    if (!stanza) {
      return res.status(404).json({ error: 'Stanza non trovata' });
    }

    // Verifica se l'utente è il proprietario o un membro della stanza
    const isAuthorized = stanza.owner.equals(user._id) || stanza.people.some(person => person.equals(user._id));

    if (!isAuthorized) {
      return res.status(403).json({ error: 'Accesso non autorizzato' });
    }

    // Restituisci la stanza trovata
    res.status(200).json(stanza);
  } catch (error) {
    console.error('Errore durante il recupero della stanza:', error);
    res.status(500).json({ error: 'Errore durante il recupero della stanza' });
  }
};

exports.searchUsersByUsername = async (req, res) => {
  try {
    // Ottieni il token JWT dal cookie della richiesta
    const token = req.cookies.token;

    // Verifica se il token è presente
    if (!token) {
      return res.status(401).json({ error: 'Token non fornito' });
    }

    // Decodifica il token JWT per ottenere l'username dell'utente autenticato
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Trova l'utente nel database tramite l'username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Utente autenticato non trovato' });
    }

    // Ottieni il termine di ricerca dalla query string
    const { searchQuery } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ error: 'Termine di ricerca non fornito' });
    }

    // Cerca gli utenti nel database tramite il termine di ricerca
    const users = await User.find({ username: new RegExp(searchQuery, 'i') });

    // Restituisci gli utenti trovati
    res.status(200).json(users);
  } catch (error) {
    console.error('Errore durante la ricerca degli utenti:', error);
    res.status(500).json({ error: 'Errore durante la ricerca degli utenti' });
  }
};

// Middleware per estrarre l'utente dal token JWT
exports.extractUserFromToken = async (req, res, next) => {
  try {
    // Ottieni il token JWT dal cookie della richiesta
    const token = req.cookies.token;

    // Se il token non è presente, restituisci un errore di autenticazione
    if (!token) {
      return res.status(401).json({ error: 'Token non fornito' });
    }

    // Estrai l'username dal payload del token JWT
    const decodedToken = jwt.verify(token, 'appartami');
    const username = decodedToken.username;

    // Cerca l'utente nel database tramite l'username
    const user = await User.findOne({ username });

    // Se l'utente non è stato trovato, restituisci un errore di autenticazione
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Aggiungi l'utente alla richiesta in modo che possa essere utilizzato nei successivi middleware o endpoint
    req.user = user;

    // Passa alla funzione middleware successiva
    next();
  } catch (error) {
    console.error('Errore durante l\'estrazione dell\'utente dal token JWT:', error);
    res.status(500).json({ error: 'Errore durante l\'estrazione dell\'utente dal token JWT' });
  }
};


