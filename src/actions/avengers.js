import axios from 'axios';

import {
  GET_AVENGERS
} from '../constants';

export const getAvengers = () => {
  return dispatch => axios
    .get(
      'http://gateway.marvel.com/v1/public/characters',
      {
        params: {
          apikey: '215da1c06db84967aad1ccf78e28e72c'
        }
      }).then(({
        data: {
          data: {
            results
          }
        }
      }) => dispatch({
        type: GET_AVENGERS,
        payload: results
      }));
};
