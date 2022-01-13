const { idea, info, user } = require('../../../../models');
const { Op } = require("sequelize");

module.exports.main = async (event) => {
  const { userId, title, area_of_interest, author } = event.queryStringParameters;
  const body = {};
  let statusCode;

  const whereParams = {}

  if (title) whereParams.title = title;
  if (area_of_interest) whereParams.area_of_interest = area_of_interest;

  try {
    let authorInfo = author ? await user.findAll({
      include: {
        model: info,
        where: {
          value: author
        }
      }
    }) : null;

    if(authorInfo && authorInfo.length >= 0) whereParams[Op.or] = authorInfo.map((a) => { return { AuthorId: a.dataValues.id } });

    const ideas = await idea.findAll({
        attributes: ['id', 'title', 'status', 'description', 'area_of_interest', 'AuthorId'],
        include: [{ all: true, nested: true }],
        where: whereParams
    });

    const myIdeas = [];
    const interestingIdeas = [];

    ideas.map((idea) => {
        if (idea.dataValues.AuthorId === userId) myIdeas.push(idea)
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