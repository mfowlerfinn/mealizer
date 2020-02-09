const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "uid"
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    }
  };
  const options = {
    tableName: "ingredient_lists",
    comment: "",
    indexes: []
  };
  const IngredientListsModel = sequelize.define("ingredient_lists_model", attributes, options);
  return IngredientListsModel;
};