'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.Referral,{as:"referral", foreignKey:'patientId'})
    }
  }
  Patient.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
      lastName: {
        type: DataTypes.STRING(255),
          allowNull: false,
      },
      dateOfBirth:{
        type:DataTypes.DATE,
        allowNull:false
      },
      contactInfo: {
        type:DataTypes.STRING,
        allowNull:false
      },
      nhis: {
        allowNull: false,
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM('male','female'),
        allowNull:false
       },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Patient',
  });
  return Patient;
};