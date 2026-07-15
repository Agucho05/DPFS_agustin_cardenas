module.exports = (sequelize, dataTypes) => {
  let alias = "Cart";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: dataTypes.STRING(50),
      allowNull: false,
      defaultValue: "active",
    },
  };
  let config = {
    tableName: "carts",
    timestamps: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    // Relación: Un carrito pertenece a un usuario (N:1)
    Cart.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });

    // Relación: Un carrito tiene muchos productos (N:M a través de cart_products)
    Cart.hasMany(models.CartProduct, {
      as: "cart_products",
      foreignKey: "cart_id",
    });
  };

  return Cart;
};
