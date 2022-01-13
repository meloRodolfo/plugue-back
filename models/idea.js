'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const idea = sequelize.define('idea', {
    title: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    area_of_interest: {
      type: DataTypes.STRING,
    },
    AuthorId: {
      type: DataTypes.STRING,
    },
  });

  idea.associate = function associateModels(models) {
    idea.belongsTo(models.user, { as: 'Author' });
    idea.belongsToMany(models.user, { 
      through: 'interest',
      onDelete: 'CASCADE',
     });
  }

  return idea;
};