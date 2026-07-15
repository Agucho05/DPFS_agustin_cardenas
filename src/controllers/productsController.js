const { validationResult } = require("express-validator");
// Importamos los Operadores de Sequelize para poder hacer búsquedas parciales

const { Op } = require("sequelize");

// Requerimos la base de datos (nuestros modelos)
const db = require("../../database/models");

const productsController = {
  // 1. Mostrar todos los productos (Catálogo / Home)
  index: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: [{ association: "category" }],
      });
      res.render("index", { products });
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      res.send("Hubo un error al cargar el catálogo.");
    }
  },

  // 1.5 Buscador de productos
  search: async (req, res) => {
    try {
      // Atrapamos la palabra que el usuario escribió en el header
      const searchedWord = req.query.keyword;

      const products = await db.Product.findAll({
        where: {
          name: {
            [Op.like]: `%${searchedWord}%`, // Busca coincidencias en cualquier parte del nombre
          },
        },
        include: [{ association: "category" }],
      });

      // Reutilizamos la vista index para mostrar los resultados de la búsqueda
      res.render("index", { products });
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      res.send("Hubo un error al procesar la búsqueda.");
    }
  },

  // 2. Detalle de un producto en particular
  detail: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await db.Product.findByPk(id, {
        include: [{ association: "category" }],
      });

      if (product) {
        res.render("products/detalle-producto", { product });
      } else {
        res.send("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al cargar el detalle:", error);
      res.send("Hubo un error al cargar el detalle del producto.");
    }
  },

  // 3. Formulario de creación
  create: async (req, res) => {
    try {
      const categories = await db.Category.findAll();
      res.render("products/crear-producto", { categories });
    } catch (error) {
      console.error("Error al cargar el formulario de creación:", error);
      res.send("Hubo un error al cargar el formulario.");
    }
  },

  // 4. Guardar el producto nuevo en la base de datos
  store: async (req, res) => {
    try {
      // 1. Atrapamos errores de validación
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Necesitamos traernos las categorías de vuelta para poder renderizar la vista
        const categories = await db.Category.findAll();
        return res.render("products/crear-producto", {
          errors: errors.mapped(),
          oldData: req.body,
          categories, // Le pasamos las categorías de nuevo
        });
      }

      await db.Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category_id: req.body.category_id,
        image: req.file ? req.file.filename : "default-image.jpg",
      });
      res.redirect("/");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.send("Hubo un error al intentar guardar el producto.");
    }
  },

  // 5. Formulario de edición
  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const productToEditPromise = db.Product.findByPk(id);
      const categoriesPromise = db.Category.findAll();

      const [productToEdit, categories] = await Promise.all([
        productToEditPromise,
        categoriesPromise,
      ]);

      if (productToEdit) {
        res.render("products/editar-producto", { productToEdit, categories });
      } else {
        res.send("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al cargar el formulario de edición:", error);
      res.send("Hubo un error al cargar el formulario.");
    }
  },

  // 6. Actualizar el producto en la base de datos
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Traemos las categorías de vuelta
        const categories = await db.Category.findAll();

        // ¡Truco! Armamos un objeto "falso" llamado productToEdit con los datos que el usuario
        // intentó enviar, para que la vista de edición no se rompa y mantenga lo escrito.
        const productToEdit = {
          id: id,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category_id: parseInt(req.body.category_id),
        };

        return res.render("products/editar-producto", {
          errors: errors.mapped(),
          productToEdit,
          categories,
        });
      }

      const product = await db.Product.findByPk(id);

      await db.Product.update(
        {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category_id: req.body.category_id,
          image: req.file ? req.file.filename : product.image,
        },
        {
          where: { id: id },
        },
      );
      res.redirect(`/products/${id}`);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.send("Hubo un error al intentar actualizar el producto.");
    }
  },

  // 7. Borrar un producto
  destroy: async (req, res) => {
    try {
      const id = req.params.id;
      await db.Product.destroy({
        where: { id: id },
      });
      res.redirect("/");
    } catch (error) {
      console.error("Error al borrar el producto:", error);
      res.send("Hubo un error al intentar borrar el producto.");
    }
  },
};

module.exports = productsController;
