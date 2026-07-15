const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// 1. Configuración de Multer para guardar las fotos de perfil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/users"));
  },
  filename: (req, file, cb) => {
    const newFilename = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});
const upload = multer({ storage });

// Importamos el controlador y middlewares
const usersController = require("../controllers/usersController");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// --- RUTAS DE LOGIN Y REGISTRO ---
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersController.procesarLogin);

router.get("/registro", guestMiddleware, usersController.registro);
router.post(
  "/registro",
  upload.single("avatar"),
  usersController.procesarRegistro,
);

router.get("/logout", usersController.logout);

// --- RUTAS DEL PERFIL (VER DETALLE Y EDITAR) ---
// Mostrar el perfil (Solo si está logueado)
router.get("/perfil", authMiddleware, usersController.profile);

// Procesar la edición del perfil (Interceptamos la nueva foto si es que sube una)
router.put(
  "/perfil",
  authMiddleware,
  upload.single("avatar"),
  usersController.updateProfile,
);

module.exports = router;
