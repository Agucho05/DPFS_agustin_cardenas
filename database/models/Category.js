module.exports = (sequelize, dataTypes) => {
  let alias = "Category";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
  };
  let config = {
    tableName: "categories",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  // Relación: Una categoría tiene muchos productos (1:N)
  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "category_id",
    });
  };

  return Category;
};
