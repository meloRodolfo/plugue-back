const { idea, user } = require('../../../../models');

module.exports.main = async (event) => {
  const { userId, title, area_of_interest } = event.queryStringParameters;
  const body = {};
  let statusCode;

  const whereParams = {}

  if (title) whereParams.title = title;
  if (area_of_interest) whereParams.area_of_interest = area_of_interest;

  try {
    const ideas = await idea.findAll({
        attributes: ['id', 'title', 'status', 'description', 'area_of_interest', 'author'],
        include: [{
          model: user
        }],
        where: whereParams
    });

    const myIdeas = [];
    const interestingIdeas = [];

    ideas.map((idea) => {
        if (idea.dataValues.author === userId) myIdeas.push(idea)
        else interestingIdeas.push(idea)
    })

    statusCode = 200;
    body.message = "Success to list idea";
    body.interestingIdeas = interestingIdeas;
    body.myIdeas = myIdeas;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to list idea';
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