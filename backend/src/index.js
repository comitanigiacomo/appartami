const express = require("express"); 
const { connectToMongoDB } = require('./database/config');

const app = express(); 
const PORT = process.env.PORT || 8080; 


//Connessione al database: 
connectToMongoDB()
  .then(database => {
    // Esegui il server Express solo dopo aver stabilito la connessione al database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error starting the server:", err);
  });
