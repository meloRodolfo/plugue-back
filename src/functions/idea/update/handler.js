const { idea } = require('../../../../models');

module.exports.main = async (event) => {
  const { ideaId } = event.pathParameters;
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  const body = {};
  let statusCode;

  try {
    const updateIdea = await idea.findByPk(ideaId, {
      attributes: ['id', 'title', 'status', 'description', 'area_of_interest', 'AuthorId'],
    });

    console.log(`Updating idea ${updateIdea}`)
    
    if(!updateIdea) throw new Error("Idea not found");

    await updateIdea.update(eventBody);

    statusCode = 200;
    body.message = "Success to update idea";

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to update new idea'
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