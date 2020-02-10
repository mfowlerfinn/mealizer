const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: true,
      comment: null,
      field: "uid",
      unique: "uid_UNIQUE"
    },
    item: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item"
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantity"
    },
    unit: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "unit"
    },
    notes: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "notes"
    },
    range: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "range"
    },
    grocery_list: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "grocery_list"
    },
    ingredient_list: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ingredient_list"
    },
    user_uid: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "user_uid",
      unique: "user_uid_UNIQUE",
      references: {
        key: "user_uid",
        model: "recipes_model"
      }
    }
  };
  const options = {
    tableName: "ingredients",
    comment: "",
    indexes: []
  };
  const IngredientsModel = sequelize.define("ingredients_model", attributes, options);
  return IngredientsModel;
};