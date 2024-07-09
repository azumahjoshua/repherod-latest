'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Hospitals', 'bedCapacity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('Hospitals', 'availableBeds', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('Hospitals', 'emergencyServices', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('Hospitals', 'specialties', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [], 
    });
    await queryInterface.addColumn('Hospitals', 'outpatientServices', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Hospitals', 'bedCapacity');
    await queryInterface.removeColumn('Hospitals', 'availableBeds');
    await queryInterface.removeColumn('Hospitals', 'emergencyServices');
    await queryInterface.removeColumn('Hospitals', 'specialties');
    await queryInterface.removeColumn('Hospitals', 'outpatientServices');
  }
};
