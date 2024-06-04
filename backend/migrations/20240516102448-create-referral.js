'use strict';
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Referrals', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      referralReason: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      referralDiagnosis: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      refDoc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID,
        allowNull:false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      patientId: {
        type: Sequelize.UUID,
        allowNull:false,
        onDelete: 'CASCADE',
        references: {
          model: 'Patients',
          key: 'id'
        }
      },
      refType: {
        allowNull:false,
        type: Sequelize.ENUM('internal','external','international'),
        default: "external",
      },
      temperature: {
        allowNull:false,
        type: Sequelize.STRING
      },
      bloodPressure: {
        allowNull:false,
        type: Sequelize.STRING
      },
      heartRate: {
        allowNull:false,
        type: Sequelize.STRING
      },
      oxygenSaturation: {
        allowNull:false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Referrals');
  }
};