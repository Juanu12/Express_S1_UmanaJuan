
const connectDB = require('../db');
const DB = require('../db');
const { ObjectId } = require("mongodb");


const COLLECTION = "campers";


async function getCampers() {

const db = await connectDB();

// Nos conectamos a la db , encontramos y volvemos array los campers

return db.collection(COLLECTION).find().toArray();


}


async function addCamper() {

const db = await connectDB();

// Nos conectamos a la db, para insertar un nuevo camper

const result =  await db.collection(COLLECTION).insertOne(camper);


// copiamos los datos que nos de camper, y para id, le decimos que ponga el id del nuevo objeto que creó

return {...camper, _id: result.insertedId}


}



async function updateCamper() {

 const db = await connectDB();

 // Nos conectamos a la db, y actualizamos un dato

 const result = await db.collection(COLLECTION).updateOne(camper);

 // Copiamos los datos de camper 

 return {...camper, _id: result.ObjectId}




}




async function deleteCamper() {

const db = await connectDB();

// Nos conectamos a la db,  y eliminamos el camper convirtiendo el id string que se recibe a id normal

  const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 1) {
    return { message: " Camper eliminado", id };
  } else {
    return { message: " Camper no encontrado", id };
  }
};


module.exports = {

getCampers,
addCamper,
updateCamper,
deleteCamper

};