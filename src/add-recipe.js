/**
 * Route: POST /recipe
*/

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const uuid = require('uuid');
const util = require('./util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.RECIPE_TABLE;

exports.handler = async (event) => {
    try {
        let item = JSON.parse(event.body).Item;
        item.user_id = util.getUserId(event.headers);
        item.user_name = util.getUserName(event.headers);
        item.recipe_id = item.user_id + ':' + uuid.v4();
        item.timestamp = new Date().getTime();

        // console.log(event);

        let data = await dynamodb.put({
            TableName: tableName,
            Item: item
        }).promise();

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(item)
        }
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}

