const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = 'usersTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

const { v4: uuidv4 } = require('uuid');

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/************************************
 * HTTP Get method to list objects *
 ************************************/

app.get('/users', async function (req, res) {
  var params = {
    TableName: tableName,
    Select: 'ALL_ATTRIBUTES'
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    let users = data.Items;
    if (req.query.uids) {
      const uids = req.query.uids.split(',');

      const checkForUID = UID => uids.includes(UID);
      users = users.filter(user => checkForUID(user.UID));
    }
    res.json(users);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});

/************************************
 * HTTP Get method to query objects *
 ************************************/

app.get('/users/:UID', async function (req, res) {
  const condition = {};
  condition['UID'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: [req.params.UID]
  };

  const queryParams = {
    TableName: tableName,
    KeyConditions: condition
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});

/************************************
 * HTTP put method for insert object *
 *************************************/

app.put('/users', async function (req, res) {
  let putItemParams = {
    TableName: tableName,
    Item: req.body
  };
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'put call succeed!', url: req.url, data: data });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post('/users', async function (req, res) {
  const userItem = {
    UID: uuidv4(),
    email: req.body.email
  };

  let putItemParams = {
    TableName: tableName,
    Item: userItem
  };
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'post call succeed!', url: req.url, data: data });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

app.listen(3000, function () {
  console.log('App started');
});

module.exports = app;
