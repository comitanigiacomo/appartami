const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {

    await client.connect();
    console.log("Connected successfully to MongoDB server");
    return client.db();

  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    throw err; 
  }
}

module.exports = { connectToMongoDB };
