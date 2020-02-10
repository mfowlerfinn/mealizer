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
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    },
    user_uid: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "user_uid",
      unique: "user_uid_UNIQUE"
    }
  };
  const options = {
    tableName: "grocery_lists",
    comment: "",
    indexes: []
  };
  const GroceryListsModel = sequelize.define("grocery_lists_model", attributes, options);
  return GroceryListsModel;
};