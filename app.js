const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");

// --- IMPORTACIÓN DE RUTAS Y CONTROLADORES ---
const usersRouter = require("./src/routes/users");
const productsRouter = require("./src/routes/products");
const productsController = require("./src/controllers/productsController"); // Lo traemos para la Home

const app = express();

// --- CONFIGURACIÓN DEL MOTOR DE VISTAS ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// --- MIDDLEWARES ---
// Carpeta pública para archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, "public")));

// Capturar datos de formularios (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Permitir métodos PUT y DELETE
app.use(methodOverride("_method"));

// Configuración de la sesión
app.use(
  session({
    secret: "SecretoDeMiE-commerce",
    resave: false,
    saveUninitialized: false,
  }),
);

// Pasar datos del usuario logueado a las vistas
app.use((req, res, next) => {
  if (req.session.userLogged) {
    res.locals.userLogged = req.session.userLogged;
  }
  next();
});

// --- ENRUTADORES ---

// Home (Reutilizamos el método index del controlador para que la Home muestre la DB)
app.get("/", productsController.index);

// Rutas de Usuarios
app.use("/", usersRouter);

// Rutas de Productos (Acá entra a trabajar el router que creaste recién)
app.use("/products", productsRouter);

// Carrito de compras (Queda estático por ahora)
app.get("/carrito", (req, res) => {
  res.render("products/carrito");
});

// --- LEVANTAR SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});
