'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('originals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_name: {
        type: Sequelize.STRING
      },
      image_id: {
        type: Sequelize.UUID
      },
      csv_id: {
        type: Sequelize.BIGINT
      },
      csv_name: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('originals');
  }
};