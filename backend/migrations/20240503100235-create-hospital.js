'use strict';
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hospitals', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      hospitalName: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      contactInfo: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull:false
      },
      ownership: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hospitals');
  }
};