import { GET_AVENGERS } from '../constants';
import avengersReducer from './avengersReducer';

describe('Avengers reducer', () => {
  it('should return the default value', () => {
    const result = avengersReducer(
      undefined,
      {
        type: null
      }
    );
    expect(result).toEqual([]);
  });
  it('should return an array of avengers', () => {
    const mockAvengersData = [
      {
        id: 1,
        name: "Iron Man"
      },
      {
        id: 2,
        name: "Thor"
      },
      {
        id: 3,
        name: "Captain America"
      },
    ];
    const result = avengersReducer(
      undefined,
      {
        type: GET_AVENGERS,
        payload: mockAvengersData
      }
    );
    expect(result).toEqual(mockAvengersData);
  });
});
