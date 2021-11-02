const { idea } = require('../../../../models');
const { uuid } = require('../../../utils/uuid');

module.exports.main = async (event) => {
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
    body: JSON.stringify(body)
  }
}