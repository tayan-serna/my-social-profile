import { EDIT_PROFILE } from '../constants';

export const initialState = {
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia lectus nulla, et ornare risus malesuada eu. Proin sodales elit id bibendum hendrerit. Vivamus vitae elementum leo. Phasellus imperdiet felis eros, et luctus nulla posuere placerat. Cras aliquam suscipit tempor. Aliquam erat volutpat. Ut vel felis vitae ligula accumsan interdum.',
  favAvenger: 'Captain America',
  name: 'Adrian Serna',
  phone: '+57 3106064463',
  imageSrc: ''
};

function profile(state = initialState, action) {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default profile;
