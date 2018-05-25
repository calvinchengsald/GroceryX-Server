'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroceryList = sequelize.define('GroceryList', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isNotNull(value) {
          if (!value) {
            throw new Error('Name Cannot be null');
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
    date: DataTypes.DATE,
    private: DataTypes.BOOLEAN
  }, {});
  GroceryList.associate = function(models) {
    // associations can be defined here
    GroceryList.belongsTo(models.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE",
      as: "group"
    });
    GroceryList.belongsTo(models.User, {
      foreignKey: "ownerId",
      onDelete: "CASCADE",
      as: "owner"
    });
    GroceryList.hasMany(models.GroceryListItem, {
      as: "groceries",
      foreignKey: "groceryListId",
    });
  };
  return GroceryList;
};
