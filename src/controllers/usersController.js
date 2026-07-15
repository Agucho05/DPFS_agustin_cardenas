const bcrypt = require("bcryptjs");
// Importamos la función para leer los resultados de la validación
const { validationResult } = require("express-validator");
// Importamos la base de datos (Sequelize)
const db = require("../../database/models");

const usersController = {
  login: (req, res) => {
    res.render("users/login");
  },

  registro: (req, res) => {
    res.render("users/registro");
  },

  procesarRegistro: async (req, res) => {
    try {
      // 1. Atrapamos los resultados de las validaciones del middleware
      const errors = validationResult(req);

      // 2. Si el array de errores NO está vacío (hubo errores de validación)
      if (!errors.isEmpty()) {
        return res.render("users/registro", {
          errors: errors.mapped(), // Convertimos el array en un objeto para leerlo fácil en EJS
          oldData: req.body, // Le devolvemos lo que escribió para que no lo pierda
        });
      }

      // 3. Si todo está perfecto, sigue el flujo normal:
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      await db.User.create({
        firstName: req.body.nombre,
        lastName: req.body.apellido,
        email: req.body.email,
        password: hashedPassword,
        category: "user",
        image: req.file ? req.file.filename : "default-avatar.jpg",
      });

      res.redirect("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      res.send("Hubo un error al registrar el usuario.");
    }
  },

  procesarLogin: async (req, res) => {
    try {
      // 1. Atrapamos los resultados de las validaciones
      const errors = validationResult(req);

      // 2. Si hay errores (email no existe, contraseña incorrecta, etc.), volvemos a la vista
      if (!errors.isEmpty()) {
        return res.render("users/login", {
          errors: errors.mapped(),
          oldData: req.body, // Mantenemos el correo escrito por el usuario
        });
      }

      // 3. Si no hay errores, Express Validator ya nos garantizó que los datos son correctos.
      // Buscamos al usuario para meterlo en sesión.
      const userToLogin = await db.User.findOne({
        where: { email: req.body.email },
      });

      // Extraemos los datos puros y borramos el hash por seguridad
      let usuarioEnSesion = userToLogin.dataValues;
      delete usuarioEnSesion.password;

      // Guardamos en sesión y redirigimos a la Home
      req.session.userLogged = usuarioEnSesion;
      return res.redirect("/");
    } catch (error) {
      console.error("Error en el login:", error);
      res.send("Hubo un error al intentar iniciar sesión.");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },

  // --- NUEVOS MÉTODOS PARA EL PERFIL ---

  // 1. Muestra el detalle del usuario
  profile: (req, res) => {
    // Le pasamos a la vista los datos de la sesión actual
    res.render("users/perfil", { user: req.session.userLogged });
  },

  // 2. Procesa la actualización de datos
  updateProfile: async (req, res) => {
    try {
      const userId = req.session.userLogged.id;

      // Actualizamos la base de datos MariaDB
      await db.User.update(
        {
          firstName: req.body.nombre,
          lastName: req.body.apellido,
          // Si el usuario subió una foto nueva, la guardamos. Si no, conservamos la actual.
          image: req.file ? req.file.filename : req.session.userLogged.image,
        },
        {
          where: { id: userId },
        },
      );

      // ¡Clave! Actualizamos también la sesión en memoria para que el Header cambie en tiempo real
      req.session.userLogged.firstName = req.body.nombre;
      req.session.userLogged.lastName = req.body.apellido;
      if (req.file) {
        req.session.userLogged.image = req.file.filename;
      }

      // Redirigimos de nuevo a la misma página para ver los cambios
      res.redirect("/perfil");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      res.send("Hubo un error al intentar actualizar tus datos.");
    }
  },
};

module.exports = usersController;
