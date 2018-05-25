'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    groupName: {
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
  }, {});
  Group.associate = function(models) {
    // associations can be defined here



    Group.hasMany(models.GroupUser, {
      as: "groupusers",
      foreignKey: "groupId",
    });
    Group.hasMany(models.GroceryList, {
      as: "grocerylists",
      foreignKey: "groupId",
    });


  };
  return Group;
};
