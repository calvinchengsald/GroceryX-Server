'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroceryListItem = sequelize.define('GroceryListItem', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isNotNull(value) {
          if (!value) {
            throw new Error('groupName Cannot be null');
            // we also are in the model's context here, so this.otherField
            // would get the value of otherField if it existed
          }
          if (value.length < 1) {
            throw new Error('Cannot be empty string');
            // we also are in the model's context here, so this.otherField
            // would get the value of otherField if it existed
          }
        }
      }
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
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
      onDelete: "CASCADE",
      as: "buyer"
    });
    GroceryListItem.belongsTo(models.GroceryList, {
      foreignKey: "groceryListId",
      onDelete: "CASCADE",
      as: "grocerylist"
    });
  };
  return GroceryListItem;
};
