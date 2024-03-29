const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = 'roundsTable';
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

app.get('/rounds', async function (req, res) {
  const params = {
    TableName: tableName,
    Select: 'ALL_ATTRIBUTES'
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    let rounds = data.Items;

    if (req.query.players) {
      const players = req.query.players.split(',');

      const checkForPlayers = arr => players.every(p => arr.includes(p));
      rounds = rounds.filter(round => checkForPlayers(round.players));
    }
    const dateSortedRounds = [...rounds].sort((r1, r2) => new Date(r2.date) - new Date(r1.date));
    res.json(dateSortedRounds);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});

/************************************
 * HTTP Get method to query objects *
 ************************************/

app.get('/rounds/:RID', async function (req, res) {
  const condition = {};
  condition['RID'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: [req.params.RID]
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
 * HTTP post method for insert object *
 *************************************/

app.post('/rounds', async function (req, res) {
  const roundItem = {
    RID: uuidv4(),
    course: req.body.course,
    date: req.body.date,
    scores: JSON.parse(req.body.scores),
    players: JSON.parse(req.body.players)
  };

  const putItemParams = {
    TableName: tableName,
    Item: roundItem
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
