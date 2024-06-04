'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      roleName: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};
// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,contactInfo:string,password:string,roleID:integer
1485  npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,contactInfo:string,password:string
 1486  npx sequelize-cli model:generate --name Role --attributes roleName:string
 1805  npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,contactInfo:string,password:string,role