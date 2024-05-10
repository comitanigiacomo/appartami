const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

// Definisci la funzione di login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cerca l'utente nel database tramite l'username
        const user = await User.findOne({ username });

        // Se l'utente non è stato trovato, restituisci un errore di autenticazione
        if (!user || user.username !== req.body.username) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        // Verifica la password
        if (!bcrypt.compareSync(password, user.password)) {
            console.log("qui")
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        // Se le credenziali sono valide, genera un token di accesso
        const token = jwt.sign({ userId: user._id }, 'appartami', { expiresIn: '1h' });

        // Imposta il cookie con il token
        res.cookie('token', token, { httpOnly: true });

        // Invia il token di accesso al client
        res.status(200).json({ token });
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ error: 'Errore durante il login' });
    }
};
