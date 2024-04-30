const express = require("express"); 
const { connectToMongoDB } = require('./database/config.js');
const app = express(); 

// Importa le route
const userRoutes = require('./routes/userRoutes.js');
const apartmentRoutes = require('./routes/apartmentRoutes.js');
const preferenceRoutes = require('./routes/preferenceRoutes.js');
const userDistributionRoutes = require('./routes/userDistributionRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const PORT = process.env.PORT || 8080; 

// Connessione al database
connectToMongoDB()
  .then(() => {
    
    // Middleware per il parsing del corpo delle richieste
    app.use(express.json());

    // Aggiungi le route
    app.use('/api/users', userRoutes);
    app.use('/api/preferences', preferenceRoutes);
    app.use('/api/apartments', apartmentRoutes);
    app.use('/api/auth', authRoutes); 
    app.use('/api', userDistributionRoutes);

    // Esegui il server Express solo dopo aver stabilito la connessione al database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error starting the server:", err);
  });
