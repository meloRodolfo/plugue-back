const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize('plugue', 'admin', 'jlW0on0YEo5FkaMu0BTq', {
  host: 'pluguedb.cfaqgkfb9iki.us-east-1.rds.amazonaws.com',
  dialect: 'mysql'
});
