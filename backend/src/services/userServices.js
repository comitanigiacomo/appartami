const User = require('../database/models/User');

async function createUser(userData) {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser };