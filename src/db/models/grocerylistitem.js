'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroceryListItem = sequelize.define('GroceryListItem', {
    name: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    purchased: DataTypes.BOOLEAN,
    priority: DataTypes.INTEGER
  }, {});
  GroceryListItem.associate = function(models) {
    // associations can be defined here
    GroceryListItem.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    GroceryListItem.belongsTo(models.GroceryList, {
      foreignKey: "groceryListId",
      onDelete: "CASCADE"
    });
  };
  return GroceryListItem;
};
