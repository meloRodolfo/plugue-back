const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const interest = sequelize.define('interest', {
    userId: {
      type: DataTypes.STRING,
    },
    IdeaId: {
      type: DataTypes.STRING,
    },
  });

  interest.associate = function associateModels(models) {
    interest.belongsTo(models.user, { foreignKey: 'id', as: 'user' });
    interest.belongsTo(models.idea, { foreignKey: 'id', as: 'idea', onDelete: 'CASCADE', });
  }

  return interest;
};