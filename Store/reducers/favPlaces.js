const initialState = { favPlacesID: [] }

function favPlaces(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_PLACE':
      nextState = {
        ...state,
        favPlacesID: [...state.favPlacesID, action.value]
      };
      return nextState || state
    case 'UNSAVE_PLACE':
      nextState = {
        ...state,
        favPlacesID: state.favPlacesID.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default favPlaces;