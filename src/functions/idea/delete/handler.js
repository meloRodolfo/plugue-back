const { idea, user, interest } = require('../../../../models');

function NotFoundError(message) {
  this.message = message;
  this.name = "NotFoundError";
}

module.exports.main = async (event) => {
  const { ideaId } = event.pathParameters;
  const body = {};
  let statusCode;

  try {

    await interest.destroy({
      where: {
        IdeaId: ideaId
      }
    })
    const ideaToDelete = await idea.findByPk(ideaId, {
      attributes: ['id', 'title', 'status', 'description', 'area_of_interest', 'AuthorId'],
      include: user,
    });

    if(!ideaToDelete) throw new NotFoundError("Idea not found")

    await ideaToDelete.destroy();
    
    statusCode = 200;
    body.message = "Success to delete idea";
    body.idea = ideaToDelete.id;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "NotFoundError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to delete new idea';
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