"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Referral.belongsTo(models.Patient, { foreignKey: 'patientId' });
      Referral.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });    }
  }
  Referral.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      referralReason: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      referralDiagnosis: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      refDocs: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          const value = this.getDataValue('refDocs');
          return value ? value.split(',') : [];
        },
        set(val) {
          if (Array.isArray(val)) {
            this.setDataValue('refDocs', val.join(','));
          } else {
            throw new Error('Value for refDocs must be an array');
          }
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Patients",
          key: "id",
        },
      },
      refType: {
        type: DataTypes.ENUM("internal", "external", "international"),
        defaultValue: "external",
        allowNull: false,
      },
      temperature: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bloodPressure: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      heartRate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      oxygenSaturation: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Referral",
      timestamps: true,
    }
  );
  return Referral;
};
