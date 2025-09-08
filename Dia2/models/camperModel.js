
const connectDB = require('../db');
const DB = require('../db');

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

}




async function deleteCamper() {



}




module.exports = {

getCampers,
addCamper,
updateCamper,
deleteCamper

};