const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Importamos el nuevo middleware de validación
const validateProduct = require("../middlewares/validateProductMiddleware");

// 1. Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: (req, file, cb) => {
    const newFilename =
      "product-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});
const upload = multer({ storage });

const productsController = require("../controllers/productsController");

// --- RUTAS DEL CRUD ---
router.get("/", productsController.index);
router.get("/search", productsController.search);
router.get("/create", productsController.create);

// 3. Acción de creación (Inyectamos la validación aquí)
router.post(
  "/",
  upload.single("image"),
  validateProduct, // ¡El middleware entra en acción!
  productsController.store,
);

router.get("/:id", productsController.detail);
router.get("/:id/edit", productsController.edit);

// 6. Acción de edición (Inyectamos la validación aquí también)
router.put(
  "/:id",
  upload.single("image"),
  validateProduct, // ¡El middleware entra en acción!
  productsController.update,
);

router.delete("/:id", productsController.destroy);

module.exports = router;
