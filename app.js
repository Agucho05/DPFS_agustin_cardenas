const express = require("express");
const path = require("path");
const app = express();

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Configurar la carpeta pública para los archivos estáticos (tu CSS)
app.use(express.static(path.join(__dirname, "public")));

// --- RUTAS PRINCIPALES ---

// Home
app.get("/", (req, res) => {
  res.render("index");
});

// --- RUTAS DE USUARIOS ---

// Login
app.get("/login", (req, res) => {
  res.render("users/login"); // Busca en src/views/users/login.ejs
});

// Registro
app.get("/registro", (req, res) => {
  res.render("users/registro");
});

// --- RUTAS DE PRODUCTOS ---

// Carrito de compras
app.get("/carrito", (req, res) => {
  res.render("products/carrito");
});

// Detalle de producto
app.get("/detalle-producto", (req, res) => {
  res.render("products/detalle-producto");
});

// Creación de producto
app.get("/crear-producto", (req, res) => {
  res.render("products/crear-producto");
});

// --- LEVANTAR SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});
