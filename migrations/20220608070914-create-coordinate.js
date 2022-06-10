'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coordinates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image_id: {
        type: Sequelize.UUID
      },
      original_image_id: {
        type: Sequelize.UUID
      },
      max_x: {
        type: Sequelize.REAL
      },
      max_y: {
        type: Sequelize.REAL
      },
      min_x: {
        type: Sequelize.REAL
      },
      min_y: {
        type: Sequelize.REAL
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
    await queryInterface.dropTable('coordinates');
  }
};