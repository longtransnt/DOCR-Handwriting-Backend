'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('uploads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      file_name: {
        type: Sequelize.STRING
      },
      image_id: {
        type: Sequelize.UUID
      },
      thumbnail_id: {
        type: Sequelize.UUID
      },
      original_image_id: {
        type: Sequelize.UUID
      },
      ground_truth: {
        type: Sequelize.STRING
      } ,
      confidence: {
        type: Sequelize.BIGINT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('uploads');
  }
};