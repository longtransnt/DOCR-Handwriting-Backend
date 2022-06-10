'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coordinate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.uploads.hasOne(models.images, {
        as: "coordinate",
        foreignKey: "id",
        sourceKey: "image_id"
      });
    }
  }
  coordinate.init({
    id: { 
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    image_id: DataTypes.UUID,
    original_image_id: DataTypes.UUID,
    max_x: DataTypes.REAL,
    max_y: DataTypes.REAL,
    min_x: DataTypes.REAL,
    min_y: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'coordinate',
  });
  return coordinate;
};