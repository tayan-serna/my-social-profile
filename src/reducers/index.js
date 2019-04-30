// @vendors
import { combineReducers } from 'redux';

import profile from './profileReducer';
import avengers from './avengersReducer';

export default combineReducers({
  avengers,
  profile
});
