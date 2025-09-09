const express = require("express");
const router = express.Router();
const camperController = require("../controllers/camperController");

router.get("/", camperController.getCampers);
router.post("/", camperController.createCamper);
router.delete("/:id", camperController.removeCamper);


module.exports = router;
