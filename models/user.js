'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.belongsToMany(models.idea, { through: 'interest' });
    }
  };
  user.init({
    email: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};