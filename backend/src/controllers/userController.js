const User = require('../database/models/User');

// Crea un nuovo utente
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createUser
  // Altre funzioni del controller
};