const path = require("path");
const { body } = require("express-validator");
const db = require("../../database/models");

module.exports = [
  // Validación de Nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"), //[cite: 2]

  // Validación de Apellido
  body("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres"), //[cite: 2]

  // Validación de Email
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido")
    .bail() //[cite: 2]
    .custom(async (value) => {
      // Verificamos en la base de datos si el correo ya existe[cite: 2]
      const userExists = await db.User.findOne({ where: { email: value } });
      if (userExists) {
        throw new Error("Este email ya está registrado");
      }
      return true;
    }),

  // Validación de Contraseña
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"), //[cite: 2]

  // Validación de Imagen de Perfil
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (file) {
      let fileExtension = path.extname(file.originalname).toLowerCase();
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones permitidas son ${acceptedExtensions.join(", ")}`,
        ); //[cite: 2]
      }
    }
    return true;
  }),
];
