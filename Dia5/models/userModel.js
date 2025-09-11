import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({

    name: {type:String, required:true, trim: true },
    // El diccionario es para parametros, el unique es para que no se puedan repetir datos y el trim para separa espacios 
    email: {type:String, required:true, unique:true, lowercase:true, trim:true },
    age: {type: Number, min: 0}
   // El timestamps, guarda la hora y fecha que se hace el proceso
},{timestamps: true}  );



/*

-- Clase de dominio --

*/

class UserClass {
    // Se pone get para que tenga en cuenta que es un get y se ponga booleano, para luego usar el set
    get isAdult() {
        // El ??, hace que s i no hay ningun valor marca 0
        return (this.age ?? 0) >=18;
    }
    static async findByEmail(email) {
        return this.findOne(email);


    }

};


// Conecta las dos instancias
UserSchema.loadClass(UserClass)



export const UserModel = mongoose.model("User".UserSchema)