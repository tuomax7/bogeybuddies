/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

		const roundId = event.pathParameters.roundId;
		const round = {'roundId': roundId, 'roundName': `Round-${roundId}`}

    const response =  {
        statusCode: 200,
    	  headers: {
    	      "Access-Control-Allow-Origin": "*",
    	      "Access-Control-Allow-Headers": "*"
    	  },
        body: JSON.stringify(round),
    };

		return response;
};
