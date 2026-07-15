module.exports = (sequelize, dataTypes) => {
  let alias = "CartProduct";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    historical_price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  };
  let config = {
    tableName: "cart_products",
    timestamps: false,
  };

  const CartProduct = sequelize.define(alias, cols, config);

  CartProduct.associate = function (models) {
    // Esta tabla pertenece tanto al carrito como al producto
    CartProduct.belongsTo(models.Cart, {
      as: "cart",
      foreignKey: "cart_id",
    });
    CartProduct.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id",
    });
  };

  return CartProduct;
};
