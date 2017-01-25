const db = require('../index');
const Square = require('./square');
const { expect } = require('chai');

describe('Square', () => {
  before('wait for the db', () => db.didSync);
  let createdSquare;
  beforeEach(() => {
    createdSquare = Square.build({
      name: 'FakeSquare',
      number: 1,
      xcoord: [{ value: 0, inclusive: true }, { value: 5, inclusive: false }],
      zcoord: [{ value: 0, inclusive: true }, { value: 5, inclusive: false }]
    });
  });

  afterEach(() => {
    return Square.truncate({ cascade: true });
  });

  describe('Validations', () => {
    it('creates a square with two ranges, a name, and a number value', () => {
      createdSquare.save()
        .then(square => {
          expect(square.name).to.equal('FakeSquare');
          expect(square.number).to.equal(1);
          expect(square.xcoord.inclusive).to.eql([true, false]);
          expect(square.zcoord.inclusive).to.eql([true, false]);
        });
    });

    it('throws n error if the X-Coordinate Upper Bound is inclusive or the Lower Bound is exclusive', () => {
      return createdSquare.save()
      .then(square => {
        return square.update({
          xcoord: [{ value: 0, inclusive: true }, { value: 5, inclusive: true }]
        });
      })
      .catch(err => {
        expect(err.message).to.contain('Validation Error: Upper Bound for X is not exclusive');
      })
      .then(() => {
        return createdSquare.update({
          xcoord: [{ value: 0, inclusive: false }, { value: 5, inclusive: false }]
        });
      })
      .catch(err => {
        expect(err.message).to.contain('Validation Error: Lower Bound for X is not inclusive');
      });
    });

    it('throws n error if the Z-Coordinate Upper Bound is inclusive or the Lower Bound is exclusive', () => {
      return createdSquare.save()
      .then(square => {
        return square.update({
          zcoord: [{ value: 0, inclusive: true }, { value: 5, inclusive: true }]
        });
      })
      .catch(err => {
        expect(err.message).to.contain('Validation Error: Upper Bound for Z is not exclusive');
      })
      .then(() => {
        return createdSquare.update({
          zcoord: [{ value: 0, inclusive: false }, { value: 5, inclusive: false }]
        });
      })
      .catch(err => {
        expect(err.message).to.contain('Validation Error: Lower Bound for Z is not inclusive');
      });
    });
  });
});
