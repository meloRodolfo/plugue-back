'use strict';
import { Model } from 'sequelize';

import { user } from './user';

export default (sequelize, DataTypes) => {
  class info extends Model {};

  const User = info.belongsTo(user)

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