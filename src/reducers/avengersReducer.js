import { GET_AVENGERS } from '../constants';

const initialState = [];

function avengers(state = initialState, action) {
  switch (action.type) {
    case GET_AVENGERS:
      return [
        ...action.payload
      ];
    default:
      return state;
  }
}

export default avengers;
