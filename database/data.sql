USE hard_and_custom_db;

-- 1. Insertamos Categorías
INSERT INTO categories (name) VALUES 
('Monitores'), 
('Teclados'), 
('Componentes');

-- 2. Insertamos Usuarios de prueba (El hash de la contraseña es un ejemplo genérico de bcrypt)
INSERT INTO users (firstName, lastName, email, password, category, image) VALUES 
('Agustin', 'Cardenas', 'admin@hardcustom.com', '$2a$10$X8...fakehash...', 'admin', 'default-avatar.jpg'),
('Lautaro', 'Calviño', 'lauta@user.com', '$2a$10$X8...fakehash...', 'user', 'default-avatar.jpg');

-- 3. Insertamos Productos (Conectados a las categorías mediante el category_id)
INSERT INTO products (name, price, description, image, category_id) VALUES 
('Samsung Odyssey G4 27"', 550000.00, 'Monitor Gamer 240Hz, Panel IPS, G-Sync compatible.', 'monitor-g4.jpg', 1),
('Redragon Ucal Pro', 95000.00, 'Teclado mecánico wireless 75%.', 'redragon-ucal.jpg', 2),
('AMD Ryzen 5 5625U', 210000.00, 'Procesador mobile de 6 núcleos y 12 hilos.', 'ryzen5.jpg', 3);