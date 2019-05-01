import { EDIT_PROFILE } from '../constants';
import profileReducer, { initialState } from './profileReducer';

describe('Profile reducer', () => {
  it('should return the default value', () => {
    const result = profileReducer(
      undefined,
      {
        type: null
      }
    );
    expect(result).toEqual(initialState);
  });
  it('should return a modified profile', () => {
    const result = profileReducer(
      undefined,
      {
        type: EDIT_PROFILE,
        payload: {
          name: 'Serna Adrian'
        }
      }
    );
    expect(result).toEqual({
      ...initialState,
      name: 'Serna Adrian'
    });
  });
});
