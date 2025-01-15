import serverless from 'serverless-http';
import app from './src/app';

module.exports.handler = serverless(app);