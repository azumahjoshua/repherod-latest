"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Referral,{foreignKey:'userId'})
      User.belongsTo(models.Role, { foreignKey: "roleID", as: "role" });
      User.belongsTo(models.Hospital, {
        foreignKey: "hospitalID",
        as: "hospital",
      });
    }
  }
  User.init(
    {
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
      contactInfo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 255],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      roleID: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Roles",
          key: "id",
        },
      },
      hospitalID: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Hospitals",
          key: "id",
        },
      },
    },
    {
      sequelize,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
      timestamps: false,
      modelName: "User",
    }
  );
  return User;
};
// npx sequelize-cli migration:generate --name add_hospitalID_to_user
/**
 * 
 * npx sequelize-cli migration:generate --name add_NHIS_to_patient
 npx sequelize-cli model:generate --name Referral --attributes 
 referralReason:text, referralDiagnosis:text, refDoc:string,userId:string, patientID:string, refType:string,
 temperature:string, bloodPressure:string,heartRate:string,oxygenSaturation:string

npx sequelize-cli model:generate --name Patient --attributes 
 firstName:string,lastName:string,dateofbirth:Date
 contactInfo:string, gender:enum(male,female),

 npx sequelize-cli model:generate --name Patient --attributes firstName:string,lastName:string,dateOfBirth:Date,contactInfo:string,gender:ENUM(male,female)
npx sequelize-cli model:generate --name Patient --attributes firstName:string,lastName:string,dateOfBirth:Date,contactInfo:string,nhis:string,gender:enum()

npx sequelize-cli model:generate --name Referral --attributes referralReason:text,referralDiagnosis:text,refDoc:string,userId:string,patientId:string,refType:string,temperature:string,bloodPressure:string,heartRate:string,oxygenSaturation:string

 *  */
