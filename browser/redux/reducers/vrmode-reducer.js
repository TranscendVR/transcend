/* --------------- INITIAL STATE --------------- */

const initialState = false;

/* --------------- ACTIONS --------------- */

export const ENABLE_VR_MODE = 'ENABLE_VR_MODE';

/* --------------- ACTION CREATORS --------------- */

export const enableVRMode = () => {
  return {
    type: ENABLE_VR_MODE
  };
};

/* --------------- REDUCER --------------- */

export default function vrModeReducer (state = initialState, action) {
  switch (action.type) {

    case ENABLE_VR_MODE:
      return true;

    default:
      return state;
  }
}
