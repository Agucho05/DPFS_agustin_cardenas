module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(150),
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
    },
    image: {
      type: dataTypes.STRING(255),
      defaultValue: "default-image.jpg",
    },
    category_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    // Relación: Un producto pertenece a una categoría (N:1)
    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "category_id",
    });

    // Relación: Un producto puede estar en muchos carritos (N:M a través de cart_products)
    Product.hasMany(models.CartProduct, {
      as: "cart_products",
      foreignKey: "product_id",
    });
  };

  return Product;
};
