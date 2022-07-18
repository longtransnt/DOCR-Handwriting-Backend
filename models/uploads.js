'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uploads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.uploads.hasOne(models.images, {
        as: "image",
        foreignKey: "id",
        sourceKey: "image_id"
      });
      models.uploads.hasOne(models.images, {
        as: "thumbnail",
        foreignKey: "id",
        sourceKey: "thumbnail_id"
      });
    }
  };
  uploads.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    file_name: DataTypes.STRING,
    image_id: {
      type: DataTypes.UUID,
      references: {
        model: "images",
        key: "id"
      }
    },
    thumbnail_id: {
      type: DataTypes.UUID,
      references: {
        model: "images",
        key: "id"
      }
    },
    original_image_id: DataTypes.UUID,
    ground_truth: DataTypes.STRING,
    confidence: DataTypes.BIGINT,
    is_verified: DataTypes.BOOLEAN,
    max_x: DataTypes.REAL,
    max_y: DataTypes.REAL,
    min_x: DataTypes.REAL,
    min_y: DataTypes.REAL,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
      sequelize,
      modelName: 'uploads',
      timestamps: true
    });
  return uploads;
};