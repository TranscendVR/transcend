const { Map } = require('immutable');
const chai = require('chai');
const { expect } = require('chai');
const chaiImmutable = require('chai-immutable');

chai.use(chaiImmutable);

import userReducer, { RECEIVE_USERS } from '../redux/reducers/user-reducer';

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

describe('Frontend userReducer', () => {
  const initialState = Map({
    'number1': user,
    'number2': user2
  });

  const newState = Map({
    'number1': updatedUser1Data,
    'number2': user2
  });

  it('updates the state to reflect a user\'s current position/rotation', () => {
    const action = {
      type: RECEIVE_USERS,
      users: newState
    };

    const nextState = userReducer(initialState, action);

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
      'number2': Map({
        id: 'number2',
        color: 'red',
        x: 1,
        y: 1.6,
        z: 5,
        xrot: 0,
        yrot: 0,
        zrot: 0
      })
    }));
  });
});

xdescribe('The view', () => {
  it('is populated with existing users upon joining', () => {

  });

  it('adds a user when a new user joins if they don\'t already exist on the DOM', () => {

  });

  it('updates the position/rotation of a user if they already exist on the DOM', () => {

  });

  it('removes a user when the user disconnects', () => {

  });
});
