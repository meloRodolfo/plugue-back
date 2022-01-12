const { interest } = require('../../../../models');

module.exports.main = async (event) => {
  const { userId } = event.pathParameters;
  const body = {};
  let statusCode;

  try {
    const getIdeas = await interest.findAll({
        where: { userId }
    });

    statusCode = 200;
    body.message = "Success to get interesting ideas";
    body.idea = getIdeas;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "NotFoundError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to get idea';
    }
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