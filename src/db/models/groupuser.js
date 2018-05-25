'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroupUser = sequelize.define('GroupUser', {

    userId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       // validate: {
       //   isNotNull(value) {
       //     if (!value) {
       //       throw new Error('Cannot be null');
       //       // we also are in the model's context here, so this.otherField
       //       // would get the value of otherField if it existed
       //     }
       //   }
       // }
    },
    groupId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       // validate: {
       //   isNotNull(value) {
       //     if (!value) {
       //       throw new Error('Cannot be null');
       //       // we also are in the model's context here, so this.otherField
       //       // would get the value of otherField if it existed
       //     }
       //   }
       // }
    }
  }, {});
  GroupUser.associate = function(models) {
    // associations can be defined here
    GroupUser.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "user"
    });
    GroupUser.belongsTo(models.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE",
      as: "group"
    });
  };
  return GroupUser;
};
