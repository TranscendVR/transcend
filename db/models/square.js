const Sequelize = require('sequelize');
const db = require('./../index');

// square is a room or shared space (like the hallway or main room)
// Sequelize.GEOMETRY info: http://docs.sequelizejs.com/en/latest/api/datatypes/#geometry
const Square = db.define('square', {
  name: Sequelize.STRING,
  number: Sequelize.INTEGER,
  dimensions: Sequelize.GEOMETRY
});

module.exports = Square;
