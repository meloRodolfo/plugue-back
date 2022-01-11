'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class interest extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'id', as: 'user' });
      this.belongsTo(models.idea, { foreignKey: 'id', as: 'idea' });
    }
  };
  interest.init({
    userId: DataTypes.STRING,
    IdeaId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'interest',
  });
  return interest;
};