'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class interest extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.idea, { foreignKey: 'idea_id', as: 'idea' });
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