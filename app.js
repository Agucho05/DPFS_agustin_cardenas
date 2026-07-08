const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Configurar la carpeta pública para los archivos estáticos (tu CSS)
app.use(express.static(path.join(__dirname, "public")));
// Configurar Express para capturar datos de formularios (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta absoluta al archivo JSON
const productsFilePath = path.join(__dirname, "data/products.json");

// Leer y parsear el JSON
const getProducts = () => {
  const productsJSON = fs.readFileSync(productsFilePath, "utf-8");
  return JSON.parse(productsJSON);
};

// --- RUTAS PRINCIPALES ---

// Home
app.get("/", (req, res) => {
  const products = getProducts(); // Traemos el array de productos del JSON
  res.render("index", { products: products }); // Se lo pasamos a la vista
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

// 1. Listado de productos
app.get("/products", (req, res) => {
  const products = getProducts();
  // Enviaremos esto a una vista 'listado.ejs' (por ahora asume que la crearás)
  res.render("products/listado", { products: products });
});

// 2. Formulario de creación de productos (Siempre arriba del /:id)
app.get("/products/create", (req, res) => {
  res.render("products/crear-producto");
});

// 3. Detalle de un producto particular
app.get("/products/:id", (req, res) => {
  const products = getProducts();
  const productId = req.params.id; // Capturamos el ID de la URL
  const productFound = products.find((p) => p.id == productId); // Buscamos el producto

  if (productFound) {
    // Si lo encuentra, renderiza la vista y le pasa los datos
    res.render("products/detalle-producto", { product: productFound });
  } else {
    // Si no lo encuentra, mostramos un mensaje básico
    res.send("Producto no encontrado");
  }
});

// 4. Acción de creación (Recibe los datos del formulario)
app.post("/products", (req, res) => {
  const products = getProducts(); // Leemos el JSON actual

  // Armamos el nuevo producto atrapando los datos con req.body
  const newProduct = {
    // Generamos un ID autoincremental buscando el último ID del array
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name: req.body.name,
    price: Number(req.body.price), // Convertimos a número
    category: req.body.category,
    // Separamos los colores por coma si es que escribió algo
    colors: req.body.colors ? req.body.colors.split(",") : [],
    description: req.body.description,
    image: "default-image.jpg", // Por ahora dejamos una estática hasta ver carga de archivos reales
  };

  // Agregamos el producto nuevo al array
  products.push(newProduct);

  // Sobreescribimos el archivo JSON original con el nuevo array
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

  // Redirigimos al usuario a la Home para que vea su producto recién creado
  res.redirect("/");
});

// Carrito de compras
app.get("/carrito", (req, res) => {
  res.render("products/carrito");
});

// --- LEVANTAR SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});
