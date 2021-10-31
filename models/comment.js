'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.idea, { foreignKey: 'idea_id', as: 'idea' });
    }
  };
  comment.init({
    userId: DataTypes.STRING,
    IdeaId: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};