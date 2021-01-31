/**
 * Route: GET /recipe/n/{recipe_id}
*/

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const _ = require('underscore');
const util = require('./util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.RECIPE_TABLE;

exports.handler = async (event) => {
    try {
        let recipe_id = decodeURIComponent(event.pathParameters.recipe_id);

        let params = {
            TableName: tableName,
            IndexName: "recipe_id-index",
            KeyConditionExpression: "recipe_id = :recipe_id",
            ExpressionAttributeValues: {
                ":recipe_id": recipe_id
            },
            Limit: 1
        };

        console.log(event);

        let data = await dynamodb.query(params).promise();
        if (!_.isEmpty(data.Items)) {
            return {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data.Items[0])
            };
        } else {
            return {
                statusCode: 404,
                headers: util.getResponseHeaders()
            };
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

