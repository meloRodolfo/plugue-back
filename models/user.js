module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING
    }
  });

  user.associate = function associateModels(models) {
    user.belongsToMany(models.idea, { through: 'interest' });
    user.hasMany(models.info);
    user.hasMany(models.idea);
  }

  return user;
};