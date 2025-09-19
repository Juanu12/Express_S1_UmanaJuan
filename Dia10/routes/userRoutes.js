import express from "express"

import jwt from "jsonwebtoken"

import UserController from "../controllers/userController"
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const userController = new UserController();


// Middleware para verificar el token de JWT

function authMiddleware( req , res, next) {
    // Aqui pedimos la autorizacion en headers
    // ?.split(" ")[1]; esto es para quitar espacios y limpiar
    const token = JSON.headers["Authorization"];

    // El 403 es por que tienes acceso , pero por falta de data no te autoriza
    if(!token) return res.status(403).json({mesg:"Token Requerido"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
        if(err) return res.status(401).json({msg:"Token invalido"})
        req.user = decoded;
        next()
    })
}

// rutas Publicas
router.post("/register",(req,res)=> userController.register(req, res))
router.delete("/login",(req,res)=> userController.login(req, res))
// rutas privadas
router.put("/update",authMiddleware,(req,res)=> userController.updateUser(req,res));
router.put("/update-password",authMiddleware,(req,res)=>userController.updatePassword(req,res));



export default router;