const { sequelize } = require('../../config/database');

const test = async () => {
    try {
        await sequelize.close();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();