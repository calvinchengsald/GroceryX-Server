'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroceryListItem = sequelize.define('GroceryListItem', {
    name: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    purchased: DataTypes.BOOLEAN,
    priority: DataTypes.INTEGER,
    userId: {
       type: DataTypes.INTEGER

    },
    groceryListId: {
       type: DataTypes.INTEGER,
       allowNull: false,

    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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
