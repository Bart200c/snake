"use strict";
const serverlessExpress = require('@vendia/serverless-express')
const app = require('./app')
exports.handler = serverlessExpress({ app, binarySettings: {
    isBinary: ({ headers }) => true,
    contentTypes: ['image/*', 'application/*', 'audio/*', 'font/*', 'video/*'],
    contentEncodings: []
  } })
