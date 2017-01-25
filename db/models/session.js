const Sequelize = require('sequelize');
const db = require('../index');

const Session = db.define('sessions', {
  sessionID: Sequelize.STRING
});

module.exports = Session;
