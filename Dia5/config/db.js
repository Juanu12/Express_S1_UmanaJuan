import mongoose from "mongoose"; 
import dotenv from "dotenv";  

dotenv.config();  

// Creamos la clase de la base de datos con la uri como constructor
export class Database {

    constructor(uri) {

            this.uri =uri;
    }

    async connect() {
        try{
            // Esto se asegurta que los campos qu se aseguren en el esquema, solo se pongan estos datos
            mongoose.set("strictQuery", true);
            await mongoose.connect(this.uri);
            console.log( "Mongodb conectado");
        } catch (err) {

            console.log ("Error de conexion" +err.message)

        }

        



    }

    async disconnect() {

        try{

            await mongoose.disconnect();
            console.log("Base de datos desconectada")


        } catch (err) {

            console.log("error al desconectar" +err.message)


        }


    }


}