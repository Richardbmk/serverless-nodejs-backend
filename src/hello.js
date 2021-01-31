'use strict';
const moment = require('moment');

exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Serverless CI/CD Demo',
        version: 'v4.0',
        timestamp: moment().unix()
      }),
  };
};
