'use strict';

const api = module.exports = require('express').Router();

api
  .use('/auth', require('./auth'))
  // .use('/user', require('./users'));

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
