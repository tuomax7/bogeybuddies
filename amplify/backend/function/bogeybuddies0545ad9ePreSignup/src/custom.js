/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const axios = require('axios');

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger

  // The below does not work yet

  const url = 'https://pnirxjxbrb.execute-api.eu-north-1.amazonaws.com/dev/users';

  const postData = {
    email: event.request.userAttributes.email
  };

  axios
    .post(url, postData)
    .then(response => {
      console.log('New user: ' + response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });

  return event;
};
