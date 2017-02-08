/* --------------- ACTIONS --------------- */

export const SET_AS_LOADED = 'SET_AS_LOADED';

/* --------------- ACTION CREATORS --------------- */

export const setAsLoaded = () => {
  return {
    type: SET_AS_LOADED
  };
};

/* --------------- REDUCER --------------- */

export default function configReducer (state = false, action) {
  switch (action.type) {

    case SET_AS_LOADED:
      return true;

    default:
      return state;
  }
}
