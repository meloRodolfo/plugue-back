const { user } = require('../../../../models');
const { info } = require('../../../../models');
const { v4: uuid } = require('uuid');
const { CognitoIdentityServiceProvider } = require('aws-sdk');

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

module.exports.main = async (event) => {
    const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    const body = {};
    let statusCode;

    try {
        const newUser = await user.create({id: eventBody.id, email: eventBody.email, type: eventBody.type});
        const array = [];
        Object.entries(eventBody.info).forEach(([key, value]) => {
            array.push({type: key, value: value, userId: eventBody.id});
        });
        await info.bulkCreate(array);

        const params = {
          UserPoolId: "us-east-1_tlITSF73b",
          Username: eventBody.id
        };
    
        await cognitoIdentityServiceProvider.adminConfirmSignUp(params).promise();

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
        body: JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'X-Amz-Security-Token',
          }
    }
}