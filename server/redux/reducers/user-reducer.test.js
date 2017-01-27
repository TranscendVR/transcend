const { Map } = require('immutable');
const chai = require('chai');
const { expect } = require('chai');
const chaiImmutable = require('chai-immutable');

chai.use(chaiImmutable);

const {
  ADD_USER,
  UPDATE_USER_DATA,
  REMOVE_USER,
  userReducer
} = require('./user-reducer');

// set up 3 users
const user = Map({
  id: 'number1',
  color: 'blue',
  x: 0,
  y: 1.6,
  z: 5,
  xrot: 0,
  yrot: 0,
  zrot: 0
});

const user2 = Map({
  id: 'number2',
  color: 'red',
  x: 1,
  y: 1.6,
  z: 5,
  xrot: 0,
  yrot: 0,
  zrot: 0
});

const user3 = Map({
  id: 'number3',
  color: 'yellow',
  x: 2,
  y: 1.6,
  z: 5,
  xrot: 0,
  yrot: 0,
  zrot: 0
});

const updatedUser1Data = Map({
  id: 'number1',
  color: 'blue',
  x: 1,
  y: 2.6,
  z: 6,
  xrot: 1,
  yrot: 1,
  zrot: 1
});

// may delete this
const updatedUser2Data = Map({
  id: 'number2',
  color: 'purple',
  x: 4,
  y: 2.6,
  z: 8,
  xrot: 2,
  yrot: 2,
  zrot: 2
});

// set up 2 initial states - one empty, one filled
let emptyInitialState;
let populatedState;

// set up an empty initial state and a populated initial state
beforeEach(() => {
  emptyInitialState = Map({});

  populatedState = Map({
    'number1': user,
    'number2': user2
  });
});

describe('userReducer', () => {

  it('adds a user to an initial empty state of users', () => {
    const action = {
      type: ADD_USER,
      user: user
    };

    const nextState = userReducer(emptyInitialState, action);

    expect(nextState).to.equal(Map({
      'number1': Map({
        id: 'number1',
        color: 'blue',
        x: 0,
        y: 1.6,
        z: 5,
        xrot: 0,
        yrot: 0,
        zrot: 0
      })
    }));
  });

  it('adds a user to a populated state of users', () => {
    const action = {
      type: ADD_USER,
      user: user3
    };

    const nextState = userReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number1': user,
      'number2': user2,
      'number3': Map({
        id: 'number3',
        color: 'yellow',
        x: 2,
        y: 1.6,
        z: 5,
        xrot: 0,
        yrot: 0,
        zrot: 0
      })
    }));
  });

  it('updates data for user', () => {
    const action = {
      type: UPDATE_USER_DATA,
      userData: updatedUser1Data
    };

    const nextState = userReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number1': Map({
        id: 'number1',
        color: 'blue',
        x: 1,
        y: 2.6,
        z: 6,
        xrot: 1,
        yrot: 1,
        zrot: 1
      }),
      'number2': user2
    }));
  });

  it('removes a user from a populated state', () => {
    const action = {
      type: REMOVE_USER,
      userId: 'number1'
    };

    const nextState = userReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number2': user2
    }));
  });

  it('returns initial empty state when action doesn\'t match', () => {
    const action = {
      type: 'SOMETHING_ELSE_USER',
      userId: 'number1'
    };

    const nextState = userReducer(emptyInitialState, action);

    expect(nextState).to.equal(Map({}));
  });

  it('returns initial populated state when action doesn\'t match', () => {
    const action = {
      type: 'SOMETHING_ELSE_USER',
      userId: 'number1'
    };

    const nextState = userReducer(populatedState, action);

    expect(nextState).to.equal(Map({
      'number1': user,
      'number2': user2
    }));
  });
});
