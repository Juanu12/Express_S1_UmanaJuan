const { MongoClient } = require("mongodb");
require("dotenv").config();

let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(process.env.URI, {
      maxPoolSize: 10,  // máximo número de conexiones 
      minPoolSize: 2,   // número mínimo de conexiones que siempre estarán abiertas
      serverSelectionTimeoutMS: 5000 // tiempo máximo de espera para seleccionar un servidor
    });

    await client.connect();
    console.log("✅ Conectado a MongoDB con pool de conexiones");
  }

  return client.db(process.env.DB_NAME);
}

module.exports = connectDB;