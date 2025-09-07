const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

let db;

async function conectarDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log(`✅ Conectado a MongoDB en la BD: ${dbName}`);
  }
  return db;
}

module.exports = conectarDB;
