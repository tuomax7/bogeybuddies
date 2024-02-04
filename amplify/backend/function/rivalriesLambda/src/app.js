const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = 'rivalriesTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(cors());

/************************************
 * HTTP Get method to list objects *
 ************************************/

app.get('/rivalries', async function (req, res) {
  const params = {
    TableName: tableName,
    Select: 'ALL_ATTRIBUTES'
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    let rivalries = data.Items;

    if (req.query.player) {
      const checkForPlayer = arr => arr.includes(req.query.player);
      rivalries = rivalries.filter(rivalry => checkForPlayer(rivalry.players));
    }

    res.json(rivalries);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});

/************************************
 * HTTP Get method to query objects *
 ************************************/

app.get('/rivalries/:RivID', async function (req, res) {
  const condition = {};
  condition['RivID'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: [req.params.RivID]
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

app.put('/rivalries', async function (req, res) {
  const putItemParams = {
    TableName: tableName,
    Item: req.body
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'put call succeed!', url: req.url, data: data });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post('/rivalries', async function (req, res) {
  const putItemParams = {
    TableName: tableName,
    Item: req.body
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(putItemParams));
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
