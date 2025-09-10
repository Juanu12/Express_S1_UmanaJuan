const jwt = require("jsonwebtoken")


// Crea la funcion con los parametros 
// Next significa que los datos fueron autorizados y puede seguir al controller la request

async function verifyToken (req, res, next) {
    // Para la autorizacion buscamos en los headers 
    const authHeader = req.headers["authorization"];

    // Aqui revisa si authheader existe, el && es un entonces, si existe parte el bearer en 2 
    // con split y separa los espacios y toma el de luego de bearer [1]
    const token = authHeader && authHeader.split("")[1];  


    // Si no detecta el token , lanza un error
    if (!token) {
        return res.status(401).json({ message: "Token requerido" });
      }


      // Con el verify , va a comparar el token entregado con el de .env 
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
    
        req.user = user; // el segundo user, sn los datos que se guardan en el token
        next(); // Da paso al controlador para devolver la respuesta
      });

}


module.exports = verifyToken;