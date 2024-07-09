'use strict';
const {Model} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hospital.hasMany(models.User,{foreignKey:'hospitalID'})
    }
  }
  Hospital.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    hospitalName: {
      type:DataTypes.STRING(255),
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contactInfo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    location:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lat: { 
      type:DataTypes.FLOAT,
      allowNull:false
    },
    lng: { 
      type:DataTypes.FLOAT,
      allowNull:false
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ownership: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bedCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableBeds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emergencyServices: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    specialties: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    outpatientServices: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Hospital',
  });
  return Hospital;
};