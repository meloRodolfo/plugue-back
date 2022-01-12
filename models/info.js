'use strict';
const {
  Model
} = require('sequelize');

const { user } = require('./user');

module.exports = (sequelize, DataTypes) => {
  class info extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'id', as: 'user' });
    }
  };

  info.init({
    userId: DataTypes.STRING,
    type: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'info',
  });
  return info;
};