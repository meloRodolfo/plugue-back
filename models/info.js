'use strict';
const {
  Model
} = require('sequelize');

const { user } = require('./user');

module.exports = (sequelize, DataTypes) => {
  class info extends Model {
    static associate(models) {
      this.belongsTo(models.user, { through: interest });
    }
  };

  info.init({
    userId: DataTypes.STRING,
    type: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'info',
    include: [ User ]
  });
  return info;
};