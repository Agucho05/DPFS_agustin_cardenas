const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

// Ruta absoluta al archivo JSON de usuarios
const usersFilePath = path.join(__dirname, "../../data/users.json");

// Función para leer el JSON
const getUsers = () => {
  const usersJSON = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(usersJSON);
};

const usersController = {
  // Muestra el formulario de login
  login: (req, res) => {
    res.render("users/login");
  },

  // Muestra el formulario de registro
  registro: (req, res) => {
    res.render("users/registro");
  },

  // Procesa el envío del formulario de registro
  procesarRegistro: (req, res) => {
    const users = getUsers();

    // 1. Encriptamos la contraseña con bcrypt (Nivel de seguridad 10 es el estándar)
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // 2. Armamos el nuevo usuario respetando la estructura de tu users.json
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1, // ID autoincremental
      firstName: req.body.nombre,
      lastName: req.body.apellido,
      email: req.body.email,
      password: hashedPassword, // Guardamos la contraseña ya encriptada
      category: "user", // Por defecto todos son usuarios normales
      // Si multer subió un archivo, guardamos su nombre. Si no, una imagen por defecto.
      image: req.file ? req.file.filename : "default-avatar.jpg",
    };

    // 3. Agregamos el usuario al array y sobreescribimos el JSON
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // 4. Redirigimos al usuario a la vista de login para que inicie sesión con su nueva cuenta
    res.redirect("/login");
  },
  // Procesa el envío del formulario de login
  procesarLogin: (req, res) => {
    console.log("1. Intento de login con:", req.body.email);

    const users = getUsers();
    const userToLogin = users.find((user) => user.email === req.body.email);

    console.log("2. ¿Encontró el mail en el JSON?:", userToLogin !== undefined);

    if (userToLogin) {
      const isPasswordOk = bcrypt.compareSync(
        req.body.password,
        userToLogin.password,
      );
      console.log("3. ¿La contraseña coincide?:", isPasswordOk);

      if (isPasswordOk) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        console.log("4. Sesión guardada. Redirigiendo a Home...");
        return res.redirect("/");
      }
    }
    console.log("5. Falló algo. Redirigiendo al login de vuelta...");
    return res.redirect("/login");
  },
  // Procesa el cierre de sesión
  logout: (req, res) => {
    // Destruimos la sesión del usuario en el servidor
    req.session.destroy();

    // Redirigimos a la home como visitantes
    return res.redirect("/");
  },
};

module.exports = usersController;
