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
      models.originals.hasOne(models.images, {
        as: "image_orginal",
        foreignKey: "id",
        sourceKey: "image_id"
      });
    }
  }
  originals.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    image_id: {
      type: DataTypes.UUID,
      references: {
        model: "images",
        key: "id"
      }
    },
    file_name: DataTypes.STRING,
    csv_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'originals',
  });
  return originals;
};