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
      field: "uid",
      unique: "uid_UNIQUE"
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    },
    category_code: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "category_code"
    },
    servings: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "servings"
    },
    subtitle: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subtitle"
    },
    story: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "story"
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
    grocery_list: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "grocery_list"
    },
    user_uid: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_uid",
      unique: "user_uid_UNIQUE"
    }
  };
  const options = {
    tableName: "recipes",
    comment: "",
    indexes: []
  };
  const RecipesModel = sequelize.define("recipes_model", attributes, options);
  return RecipesModel;
};