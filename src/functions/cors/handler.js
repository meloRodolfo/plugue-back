module.exports.main = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, GET, POST, OPTIONS, PUT, PATCH, DELETE"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};