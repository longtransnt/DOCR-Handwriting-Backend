'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class originals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.originals.hasMany(models.coordinate, {
        as: "coordinate",
        foreignKey: "original_image_id",
        sourceKey: "id"
      });
    }
  }
  originals.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    file_name: DataTypes.STRING,
    csv_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'originals',
  });
  return originals;
};