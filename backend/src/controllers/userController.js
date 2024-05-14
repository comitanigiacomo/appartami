const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importa il modulo jsonwebtoken



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
