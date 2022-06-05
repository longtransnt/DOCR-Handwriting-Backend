'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class original extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.original.hasMany(models.images, {
        as: "image",
        foreignKey: "id",
        sourceKey: "image_id"
      });
    }
  }
  original.init({
    id: { 
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    file_name: DataTypes.STRING,
    image_id: DataTypes.UUID,
    csv_id: DataTypes.BIGINT,
    csv_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'original',
  });
  return original;
};