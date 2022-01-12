const { comment } = require('../../../../models');

module.exports.main = async (event) => {
  const { text } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  const body = {};
  let statusCode;

  const { ideaId, userId } = event.pathParameters;

  try {

    console.log(ideaId)

    const newComment = await comment.create({
        text,
        ideaId,
        userId
    })
    
    statusCode = 201;
    body.message = "Success to add comment";
    body.comment = newComment.id;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to add idea'
  }

  return {
    statusCode,
    body
  }
}