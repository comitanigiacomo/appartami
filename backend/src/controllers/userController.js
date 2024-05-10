const User = require('../database/models/User');
const bcrypt = require('bcryptjs');

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