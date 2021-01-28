'use strict';
const moment = require('moment');

module.exports.hello = async event => {
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
