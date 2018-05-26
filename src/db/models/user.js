'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isNotNull(value) {
          if (!value) {
            throw new Error('name Cannot be null');
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
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isNotNull(value) {
          if (!value) {
            throw new Error('username Cannot be null');
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
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isNotNull(value) {
          if (!value) {
            throw new Error('password Cannot be null');
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
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here



    User.hasMany(models.GroupUser, {
      as: "groupusers",
      foreignKey: "userId",
    });
    User.hasMany(models.GroceryList, {
      as: "grocerylists",
      foreignKey: "ownerId",
    });

  };
  return User;
};
