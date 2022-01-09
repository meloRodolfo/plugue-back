const { idea } = require('../../../../models');
const { v4: uuid } = require('uuid');

module.exports.main = async (event) => {
  console.log(event)
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  const body = {};
  let statusCode;

  try {

    eventBody.id = uuid();
    const newIdea = await idea.create(eventBody)
    
    statusCode = 201;
    body.message = "Success to create new idea";
    body.idea = newIdea.id;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to create new idea'
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