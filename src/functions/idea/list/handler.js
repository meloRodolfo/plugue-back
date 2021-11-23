const { idea } = require('../../../../models');

function NotFoundError(message) {
  this.message = message;
  this.name = "NotFoundError";
}

module.exports.main = async (event) => {
  const eventBody = event.queryStringParameters;
  const body = {};
  let statusCode;

  try {
    const listIdeas = await idea.findAll({
        where: eventBody
    });

    if(!listIdeas) throw new NotFoundError("No Ideas found")

    statusCode = 200;
    body.message = "Success to list ideas";
    body.idea = listIdeas;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "NotFoundError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to list ideas';
    }
  }

  return {
    statusCode,
    body
  }
}