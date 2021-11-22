const { idea } = require('../../../../models');

function NotFoundError(message) {
  this.message = message;
  this.name = "NotFoundError";
}

module.exports.main = async (event) => {
  const { ideaId } = event.pathParameters;
  const body = {};
  let statusCode;

  try {
    const getIdea = await idea.findByPk(ideaId);

    if(!getIdea) throw new NotFoundError("Idea not found")

    statusCode = 200;
    body.message = "Success to get idea";
    body.idea = getIdea;

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
    body
  }
}