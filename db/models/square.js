const Sequelize = require('sequelize');
const db = require('../index');

// square is a room or shared space (like the hallway or main room)
const Square = db.define('squares', {
  // This will be the Room name that is displayed for Users
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  // Format is [{ value: lowerBound, inclusive: true }, { value: upperBound, inclusive: false }]  Always exclude the upperBound and include the lowerBound
  xcoord: {
    type: Sequelize.RANGE(Sequelize.INTERGER),
    unique: true,
    allowNull: false,
    set: function (coordinates) {
      return this.setCoordinate(coordinates, 'x');
    }
  },
  zcoord: {
    type: Sequelize.RANGE(Sequelize.INTERGER),
    unique: true,
    allowNull: false,
    set: function (coordinates) {
      return this.setCoordinate(coordinates, 'z');
    }
  }
}, {
  instanceMethods: {
    setCoordinate: function (coordinates, position) {
      // Requires the lower bound be inclusive for all Squares
      if (coordinates[0].inclusive === false) {
        return new Error(`Validation Error: Lower Bound for ${position.toUpperCase()} is not inclusive`);
      }
      // Requires the upper bound be exclusive for all Squares
      if (coordinates[1].inclusive === true) {
        return new Error(`Validation Error: Upper Bound for ${position.toUpperCase()} is not exclusive`);
      }
      this.setDataValue(`${position}coord`, coordinates);
    }
  }
});

module.exports = Square;
