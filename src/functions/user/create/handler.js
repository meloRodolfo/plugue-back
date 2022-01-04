const { user } = require('../../../../models');
const { info } = require('../../../../models');
const { v4: uuid } = require('uuid');

module.exports.main = async (event) => {
    const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    const body = {};
    let statusCode;
    body.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      };

    try {
        eventBody.id = uuid();
        const newUser = await user.create({id: eventBody.id, email: eventBody.email, type: eventBody.type});
        const array = [];
        Object.entries(eventBody.info).forEach(([key, value]) => {
            array.push({id: uuid(), type: key, value: value, userId: eventBody.id});
        });
        await info.bulkCreate(array);

        statusCode = 201;
        body.message = "Success to create new user";
        body.user = newUser.id;

    } catch (error) {
        console.log(error);
        statusCode = 500;
        body.error = 'Error to create new user'
    }

    return {
        statusCode,
        body
    }
}