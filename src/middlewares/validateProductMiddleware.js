const path = require("path");
const { body } = require("express-validator");

module.exports = [
  // Validación de Nombre
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .bail()
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres"),

  // Validación de Descripción
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .bail()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),

  // Validación de Imagen
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (file) {
      let fileExtension = path.extname(file.originalname).toLowerCase();
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones permitidas son ${acceptedExtensions.join(", ")}`,
        );
      }
    }
    return true;
  }),
];
