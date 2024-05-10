const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log('Token not provided');
    return res.status(401).json({ error: 'Token not provided' });
  }

  const tokenValue = token.split(' ')[1];
  console.log('Received token:', tokenValue);

  jwt.verify(tokenValue, 'appartami', (err, decoded) => {
    if (err) {
      console.log('Invalid token:', err.message);
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    console.log('Decoded user ID:', req.userId);
    next();
  });
};

module.exports = verifyToken;
