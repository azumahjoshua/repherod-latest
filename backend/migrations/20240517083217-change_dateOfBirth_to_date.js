'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     // Change data type of dateOfBirth column on Patients table
     await queryInterface.changeColumn('Patients', 'dateOfBirth', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    // Change data type of createdAt column on Referral table
    // await queryInterface.changeColumn('Referral', 'createdAt', {
    //   type: Sequelize.DATEONLY,
    //   allowNull: false,
    // });

    // Change data type of updatedAt column on Referral table
    // await queryInterface.changeColumn('Referral', 'updatedAt', {
    //   type: Sequelize.DATEONLY,
    //   allowNull: false,
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Patients', 'dateOfBirth', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    // await queryInterface.changeColumn('Referral', 'createdAt', {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    // });

    // await queryInterface.changeColumn('Referral', 'updatedAt', {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    // });
  }
};
