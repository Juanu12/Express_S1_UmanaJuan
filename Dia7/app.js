import  express  from "express";
import dotenv from "dotenv"
import routes from "./routes/userRoutes.js"

dotenv.config();

const app = express();
app.use(express.json())// Middleware para que solo acepte JSON'S

// Rutas principales

app.use('/api', routes)

const PORT = process.env.PORT;

app.listen(PORT,() => {
    
    console.log ("Funciona en puerto:",PORT)

} )