const express = require("express");
require("dotenv").config();

const camperRoutes = require("./routes/camperRoute");

const app = express();

app.use(express.json());

// Rutas
app.use("/campers", camperRoutes);

// Puerto desde .env
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
