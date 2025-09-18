import connectDB from "../config/db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

// importamos bcrypt , los ids de mongo  y la db

// nombramos la coleccion a acceder
const COLLECTION = "campers";

// creamos la clase 
export class CamperModel {

    // se recibe la data
  async registrar(camperData) {

    // se conecta a la db, buscando que ese camper  exista, si existe, lanza error
    const db = await connectDB();
    const existing = await db.collection(COLLECTION).findOne({ username: camperData.username });
    if (existing) throw new Error("Username ya existe");

    // Si no existe, hashea la contrasaeña y añade todos los datos, devolviendo el json
    camperData.password = await bcrypt.hash(camperData.password, 10);
    const result = await db.collection(COLLECTION).insertOne(camperData);
    return { ...camperData, _id: result.insertedId };
  }

    //se recibe el usuario y contraseña
  async login(username, password) {
    // Buscamos en la db usuario y contraseña  y si no esta el usuario o contraseña lanza error
    const db = await connectDB();
    const camper = await db.collection(COLLECTION).findOne({ username });
    if (!camper) throw new Error("Usuario no encontrado");

    // luego compara la contraseña hasheada con la del camper y si no coinciden lanza contraseña incorrecta
    const valid = await bcrypt.compare(password, camper.password);
    if (!valid) throw new Error("Contraseña incorrecta");

    // devuelve la informacion del camper
    return camper;
  }

  async getCampers() {
    // Encuentra la informacion de los campers y la devuelve
    const db = await connectDB();
    return db.collection(COLLECTION).find().toArray();
  }

  async addCamper(camper) {
    // recibe la iformacion del camper a añadir , luego la inserta en la db y finalmente devolvemos
    // el id entregado y los datos del camper
    const db = await connectDB();
    const result = await db.collection(COLLECTION).insertOne(camper);
    return { ...camper, _id: result.insertedId };
  }

  async updateCamper(id, camper) {
    // recibe el id del camper a actualizar, lo busca en la db , cambia sus datos e id 
    // y devuelve el camper con los nuevos datos e id
    const db = await connectDB();
    await db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: camper });
    return { ...camper, _id: id };
  }

  async deleteCamper(id) {
    // Recibe el id de un camper , luego lo borra de la base de datos y si se elimina notifica
    const db = await connectDB();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) return { message: "Camper eliminado", id };
    else return { message: "Camper no encontrado", id };
  }

  async searchCamperById(id) {
    // Recibe el id del camper y lo devuelve 
    const db = await connectDB();
    return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
  }



  // Busca el usuario del camper para usar luego 
  async findByUsername(username) {
    const db = await connectDB();
    return db.collection(COLLECTION).findOne({ username });
  }
}