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
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        
        // Creazione del payload del token con l'ID dell'utente e altri dati personali
        const payload = {
            username: user.username,
        };

        // Se le credenziali sono valide, genera un token di accesso
        const token = jwt.sign(payload, 'appartami', { expiresIn: '1h' });

        // Imposta il cookie con il token
        res.cookie('token', token, { httpOnly: false, sameSite: 'None', secure: true });


        // Invia il token di accesso al client
        res.status(200).json( 'login ok ' );
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ error: 'Errore durante il login' });
    }
};

exports.logout = (req, res) => {
    try {
        // Rimuovi il token dal cookie impostando la sua scadenza a un momento nel passato
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });
        
        // Invia una risposta di successo
        res.status(200).json({ message: 'Logout effettuato con successo' });
    } catch (error) {
        console.error('Errore durante il logout:', error);
        res.status(500).json({ error: 'Errore durante il logout' });
    }
};
