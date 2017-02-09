import { Map } from 'immutable';

/* --------------- INITIAL STATE --------------- */

const initialState = Map({
  current: Map({}),
  others: Map({})
});

/* --------------- ACTIONS --------------- */

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

/* --------------- ACTION CREATORS --------------- */

export const setCurrentUser = userId => {
  return {
    type: SET_CURRENT_USER,
    userId
  };
};

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

/* --------------- REDUCER --------------- */

export default function userReducer (state = initialState, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return state.set('current', action.userId);

    case RECEIVE_USERS:
      return state.set('others', action.users);

    default:
      return state;
  }
}
