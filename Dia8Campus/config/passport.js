import passport from "passport";
// Plugin para usar jwt, Importamos strategy que es un comando de passport con jwt
// lo renmbremos y con extract luego se va a poder extraer la info de los tokens
import { Strategy as JwtStrategy, ExtractJwt  } from "passport-strategy";
import { CamperModel } from "../models/CamperModel.js";


const CamperModel = new CamperModel()

// En las opciones extraemos el token de jwt y extraemos la clave secreta
const opts = {
    jwtFromrequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET

};

passport.use (
// Usamos la estrategia de Jwt, le damos los datos de opts , el payload con la informacion
// y el done es para cuando termine la verificacion, las respuestas
new JwtStrategy ( opts, async (jwt_payload, done) => {

try{
    // Buscamos en el modelo en la informacion de los campers po su id , con el del payload
    // verificamos
    const camper = await CamperModel.findById(jwt_payload.id);

    // en el () hay dos vaores, null o error, para el apartado de errores 
    // que es nulo, y devuelve el camper que encontro 
    if (camper) return done (null, camper)

    return done(null, false);

} catch(error) {
    return done(error, false)
}

})


);