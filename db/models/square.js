const Sequelize = require('sequelize');
const db = require('./../index');

// square is a room or shared space (like the hallway or main room)
// Sequelize.GEOMETRY info: http://docs.sequelizejs.com/en/latest/api/datatypes/#geometry
const Square = db.define('square', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  number: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  // Format is [{ value: lowerBound, inclusive: true }, { value: upperBound, inclusive: false }]  Always exclude the upperBound and include the lowerBound
  xcoord: {
    type: Sequelize.RANGE(Sequelize.INTERGER),
    unique: true,
    allowNull: false,
    set: function (coordinates) {
      if (coordinates[0].inclusive === false) {
        return new Error('Validation Error: Lower Bound for X is not inclusive');
      }
      if (coordinates[1].inclusive === true) {
        return new Error('Validation Error: Upper Bound for X is not exclusive');
      }
      this.setDataValue('xcoord', coordinates);
    }
  },
  zcoord: {
    type: Sequelize.RANGE(Sequelize.INTERGER),
    unique: true,
    allowNull: false,
    set: function (coordinates) {
      if (coordinates[0].inclusive === false) {
        return new Error('Validation Error: Lower Bound for Z is not inclusive');
      }
      if (coordinates[1].inclusive === true) {
        return new Error('Validation Error: Upper Bound for Z is not exclusive');
      }
      this.setDataValue('zcoord', coordinates);
    }
  }
});

module.exports = Square;
