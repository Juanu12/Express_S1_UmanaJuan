import express from "express";
import passport from "../config/passport.js";
import { CamperController } from "../controllers/CamperController.js";

const router = express.Router();
const camperController = new CamperController();

// Middleware de autenticación
const authMiddleware = passport.authenticate("jwt", { session: false });

// Middleware para roles
function permit(...allowedRoles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (allowedRoles.includes(role)) next();
    else res.status(403).json({ message: "No tienes permiso para esta acción" });
  };
}

// Rutas públicas
router.post("/register", camperController.register.bind(camperController));
router.post("/login", camperController.login.bind(camperController));

// Rutas privadas con permisos
router.get(
  "/", 
  authMiddleware, 
  permit("camper", "admin"), // campers solo ven campers
  camperController.getCampers.bind(camperController)
);

router.get(
  "/:id", 
  authMiddleware, 
  permit("camper", "admin"), // campers solo pueden ver campers
  camperController.searchCamperById.bind(camperController)
);

// Solo admin puede crear, actualizar o eliminar
router.post("/create", authMiddleware, permit("admin"), camperController.createCamper.bind(camperController));
router.put("/:id", authMiddleware, permit("admin"), camperController.updateCamper.bind(camperController));
router.delete("/:id", authMiddleware, permit("admin"), camperController.removeCamper.bind(camperController));

export default router;
 
