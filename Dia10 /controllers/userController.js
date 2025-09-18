// Logica del JWT

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/userModel" 
import dotenv from "dotenv";
dotenv.config();

// Default es por si hay mas clases, cuando se exporte se use esta
export default class UserController {

    constructor() {
        // Pasamos todas las funciones que ya usamos
        this.userModel = new UserModel
    }

    async registrer( req, res) {
        try{ // {name,email,password} --> password usada por bcrypt para que se vaya cifrada
            // otra forma --> const name = req.body.name/ req.body["name"]
            const {name, email, password} =req.body;
            const existingUser = await this.userModel.findUserbyEmail(email);

            // si hay un dato en la variable
            if(existingUser) {
               return res.status(400).json({
                    msg: "el usuario ya existe"
                })

            }

            // Se hashea el dato password 10 veces
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await this.userModel.createUser({
                name,
                email,
                password: hashedPassword

            });
            res.status(201).json({
                msg: "Usuario registrado con exito", newUser
            })

        } catch(err){
            // Para que de un mensaje concreto y no todo lo dañado en un objeto
            res.status(500).json({error: err.message})
        }
    };


    async login(req, res ) {
        try{
            const { email, password} =req.body;
            const existingUser = await this.userModel.findUserbyEmail(email);

            // si hay un usuario que no existe
            if(!existingUser) {
               return res.status(404).json({
                    msg: "el usuario ya existe"
                });

            }

            // Verificar que la contraseña sea verdadera --NUNCA

            // El compare, lo que hace es que toma la contraseña cifrada y la otra contraseña que tambien cifra y devuelve tre o false si coinciden
            const validPassword = await bcrypt.compare(password, existingUser.password) // Verificar que la contraseña

            if(!validPassword){
                return res.status(401).json({
                    msg: "contraseña invalida, prueba de nuevo"
                })
            }

            // El sign y el jwt garantiza sesiones, guarda datos de sesion como el id , la contraseña y luego el timepo de expiracion. Estas son las tres partes de jwt
            //Payload, contraseña y expiracion
            const token = jwt.sign({id:existingUser._id}, process.env.JWT_SECRET, {
                expiresIn:process.env.JWT_EXPIRES
            });
            res.status(202).json({
                msg:"Login exitoso",
                token

            })
            
        }catch(err){
            res.status(500).json({error: err.message})
        }


        
    }

    async updatePassword(req, res) {
          try{

            const {id} = req.user; // Este dato lo toma del token 
            const {password} =req.body

            const hashedPassword = await bcrypt.hash(password,10)
    await this.userModel.updateUser(id,{password:hashedPassword})            
            res.status(200).json({

                msg: " Contraseña actualizada con exito"

            })

          } catch(err) {
            res.status(500).json({error: err.message})

          } 

    }

}