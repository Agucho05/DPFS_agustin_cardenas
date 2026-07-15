module.exports = (sequelize, dataTypes) => {
  let alias = "User"; // Así lo vamos a llamar en los controladores

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: dataTypes.STRING(50),
      defaultValue: "user",
    },
    image: {
      type: dataTypes.STRING(255),
      defaultValue: "default-avatar.jpg",
    },
  };

  let config = {
    tableName: "users",
    timestamps: false, // Le decimos que no busque las columnas createdAt y updatedAt porque no las creamos en SQL
  };

  const User = sequelize.define(alias, cols, config);

  // Asociaciones: Un usuario puede tener muchos carritos (Historial de compras)
  User.associate = function (models) {
    User.hasMany(models.Cart, {
      as: "carts",
      foreignKey: "user_id",
    });
  };

  return User;
};
