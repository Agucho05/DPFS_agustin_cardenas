-- 1. Creación de la base de datos y selección
CREATE DATABASE IF NOT EXISTS hard_and_custom_db;
USE hard_and_custom_db;

-- 2. Destrucción de tablas previas (Opcional, pero ideal para poder correr el script varias veces sin errores)
-- ¡Importante! El orden de DROP debe ser estrictamente el inverso al de CREATE.
DROP TABLE IF EXISTS cart_products;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- 3. Tabla de Usuarios (No depende de nadie)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'user',
    image VARCHAR(255) DEFAULT 'default-avatar.jpg'
);

-- 4. Tabla de Categorías (No depende de nadie)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 5. Tabla de Productos (Depende de categories)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(255) DEFAULT 'default-image.jpg',
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 6. Tabla de Carritos (Depende de users)
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 7. Tabla Intermedia: Productos en el Carrito (Depende de carts y products)
CREATE TABLE cart_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    historical_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);