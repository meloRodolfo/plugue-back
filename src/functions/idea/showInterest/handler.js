const { interest } = require('../../../../models');
const { uuid } = require('uuidv4');

module.exports.main = async (event) => {
  const { ideaId, userId } = event.pathParameters;
  const body = {};
  let statusCode;

  try {
    const showInterest = await interest.create({id: uuid(), userId, ideaId})
    
    statusCode = 201;
    body.message = "Success to show interest to idea";
    body.idea = showInterest.id;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to show interest to idea'
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