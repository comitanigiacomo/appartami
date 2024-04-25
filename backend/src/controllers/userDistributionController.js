// Funzione per la distribuzione degli utenti negli appartamenti
exports.distributeUsers = async (req, res) => {
    try {
        // Logica di distribuzione degli utenti in base alle preferenze
        // ...
        res.status(200).json({ message: 'User distribution completed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to distribute users' });
    }
};