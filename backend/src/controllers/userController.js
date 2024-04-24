const User = require('../models/User');

// Controller per la registrazione degli utenti
exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Controller per il login degli utenti
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};
