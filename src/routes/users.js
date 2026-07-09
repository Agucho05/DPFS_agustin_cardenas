const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// 1. Configuración de Multer para guardar las fotos de perfil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Le decimos en qué carpeta guardar la imagen
    cb(null, path.join(__dirname, "../../public/images/users"));
  },
  filename: (req, file, cb) => {
    // Le inventamos un nombre único al archivo para que no se pisen si se llaman igual
    const newFilename = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});
const upload = multer({ storage });

// Importamos el controlador
const usersController = require("../controllers/usersController");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Rutas GET para mostrar los formularios
router.get("/login", guestMiddleware, usersController.login);
router.get("/registro", guestMiddleware, usersController.registro);
// Ruta GET para cerrar sesión
router.get("/logout", usersController.logout);

// 2. Ruta POST para procesar el formulario de registro
// El "upload.single('avatar')" intercepta el archivo que viene del input con name="avatar"
router.post(
  "/registro",
  upload.single("avatar"),
  usersController.procesarRegistro,
);

// Ruta POST para procesar el login
router.post("/login", usersController.procesarLogin);

// Ruta GET de prueba  para el authMiddleware
router.get("/perfil", authMiddleware, (req, res) => {
  // Como el middleware solo deja pasar si hay sesión, podemos usar req.session tranquilo
  res.send(
    `¡Acceso concedido, ${req.session.userLogged.firstName}! Tu authMiddleware funciona perfecto. 🚀`,
  );
});

module.exports = router;
