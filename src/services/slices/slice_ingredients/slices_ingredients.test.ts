import reducer, { fetchIngs } from './slices_ingredients';

const mockIngsList = [
  { _id: 'ing1', name: 'Ingredient 1' },
  { _id: 'ing2', name: 'Ingredient 2' },
];

describe('ings slice reducer', () => {
  const initialState = {
    ings: [],
    isLoading: true,
    err: null,
  };

  it('should return the initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('fetchIngs', () => {
    it('should set isLoading to true and clear err on pending', () => {
      const action = { type: fetchIngs.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.err).toBeNull();
    });

    it('should handle fulfilled', () => {
      const action = {
        type: fetchIngs.fulfilled.type,
        payload: mockIngsList,
      };
      const state = reducer(initialState, action);
      expect(state.ings).toEqual(mockIngsList);
      expect(state.isLoading).toBe(false);
    });

    it('should handle rejected', () => {
      const action = {
        type: fetchIngs.rejected.type,
        payload: 'Fetch ingredients error',
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.err).toBe('Fetch ingredients error');
    });
  });
});