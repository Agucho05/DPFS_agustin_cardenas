const bcrypt = require("bcryptjs");
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
      const userToLogin = await db.User.findOne({
        where: { email: req.body.email },
      });

      if (userToLogin) {
        const isPasswordOk = bcrypt.compareSync(
          req.body.password,
          userToLogin.password,
        );

        if (isPasswordOk) {
          let usuarioEnSesion = userToLogin.dataValues;
          delete usuarioEnSesion.password;

          req.session.userLogged = usuarioEnSesion;
          return res.redirect("/");
        }
      }

      return res.redirect("/login");
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
