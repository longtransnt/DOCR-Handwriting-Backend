'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('originals', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      file_name: {
        type: Sequelize.STRING
      },
      csv_name: {
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
    await queryInterface.dropTable('originals');
  }
};