'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroceryList = sequelize.define('GroceryList', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    private: DataTypes.BOOLEAN
  }, {});
  GroceryList.associate = function(models) {
    // associations can be defined here
    GroceryList.belongsTo(models.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE"
    });
    GroceryList.belongsTo(models.User, {
      foreignKey: "ownerId",
      onDelete: "CASCADE"
    });
    GroceryList.hasMany(models.GroceryListItem, {
      as: "groceries",
      foreignKey: "groceryListId",
    });
  };
  return GroceryList;
};
