import { Map } from 'immutable';

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

export const RECEIVE_USERS = 'RECEIVE_USERS';

/* --------------- ACTION CREATORS --------------- */

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

/* --------------- REDUCER --------------- */

export default function userReducer (state = initialState, action) {
  switch (action.type) {

    case RECEIVE_USERS:
      return action.users;

    default:
      return state;
  }
}
