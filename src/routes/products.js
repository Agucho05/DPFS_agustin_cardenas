const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// 1. Configuración de Multer para guardar las imágenes de los productos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guardamos las imágenes de productos directamente en la carpeta public/images
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: (req, file, cb) => {
    // Generamos un nombre único: product-123456789.jpg
    const newFilename =
      "product-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});
const upload = multer({ storage });

const productsController = require("../controllers/productsController");

// --- RUTAS DEL CRUD ---

router.get("/", productsController.index);
router.get("/search", productsController.search); // ¡Ruta nueva del buscador!
router.get("/create", productsController.create);
// ... el resto de tus rutas

// 3. Acción de creación (Interceptamos la imagen con Multer antes de ir al controlador)
router.post("/", upload.single("image"), productsController.store);

// 4. Detalle de un producto particular
router.get("/:id", productsController.detail);

// 5. Formulario de edición
router.get("/:id/edit", productsController.edit);

// 6. Acción de edición (Interceptamos la imagen nueva si es que subió una)
router.put("/:id", upload.single("image"), productsController.update);

// 7. Acción de borrado
router.delete("/:id", productsController.destroy);

module.exports = router;
