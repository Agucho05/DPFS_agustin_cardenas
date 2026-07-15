const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../../database/models");

module.exports = [
  // Validación del Email
  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido")
    .bail()
    .custom(async (value) => {
      // Verificamos si el email existe en la base de datos
      const userExists = await db.User.findOne({ where: { email: value } });
      if (!userExists) {
        throw new Error("Este correo no se encuentra registrado");
      }
      return true;
    }),

  // Validación de la Contraseña
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .custom(async (value, { req }) => {
      // Solo verificamos la contraseña si el usuario introdujo un email
      if (req.body.email) {
        const userToLogin = await db.User.findOne({
          where: { email: req.body.email },
        });

        // Si el usuario existe, comparamos el hash
        if (userToLogin) {
          const isPasswordOk = bcrypt.compareSync(value, userToLogin.password);
          if (!isPasswordOk) {
            throw new Error("La contraseña es incorrecta");
          }
        }
      }
      return true;
    }),
];
