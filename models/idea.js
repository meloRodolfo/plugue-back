'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class idea extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'id', as: 'author' });
      this.belongsToMany(models.user, { through: 'interest' });
    }
  };
  idea.init({
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    area_of_interest: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'idea',
  });
  return idea;
};