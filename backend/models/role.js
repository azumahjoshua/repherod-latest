'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User,{foreignKey:'roleID'})
    }
  }
  Role.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    roleName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Role',
  });
  return Role;
};