import { configureStore } from '@reduxjs/toolkit';
import ingSlice, { 
  fetchIngs, 
  ingSelectors, 
  TIngState 
} from './slices_ingredients';
import { TIngredient } from '@utils-types';

const mockIngredientsData: TIngredient[] = [
  { 
    _id: '1', 
    name: 'Булка', 
    type: 'bun', 
    proteins: 80, 
    fat: 24, 
    carbohydrates: 53, 
    calories: 420, 
    price: 1255, 
    image: 'https://code.s3.yandex.net/react/code/bun-02.png ', 
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png ', 
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png ' 
  },
  { 
    _id: '2', 
    name: 'Котлета', 
    type: 'main', 
    proteins: 420, 
    fat: 145, 
    carbohydrates: 22, 
    calories: 424, 
    price: 300, 
    image: 'https://code.s3.yandex.net/react/code/meat-03.png ', 
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png ', 
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png '
  }
];

type RootState = {
  ings: TIngState;
};

describe('Ingredients Slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ings: ingSlice,
      },
    });
  });


  describe('fetchIngs', () => {

    it('should handle fulfilled state', async () => {
      await store.dispatch(fetchIngs.fulfilled(mockIngredientsData, ''));

      const state = store.getState() as RootState;
      expect(state.ings.ings).toEqual(mockIngredientsData);
      expect(state.ings.isLoading).toBe(false);
      expect(state.ings.err).toBe(null);
    });

    it('should handle rejected state', async () => {
      await store.dispatch(fetchIngs.rejected(new Error('Test error'), '', undefined, 'Test error'));

      const state = store.getState() as RootState;
      expect(state.ings.isLoading).toBe(false);
      expect(state.ings.err).toBe('Test error');
    });
  });

  describe('Selectors', () => {
    it('should select ingredients correctly', () => {
      store.dispatch(fetchIngs.fulfilled(mockIngredientsData, ''));
      const ingredients = ingSelectors.ingSel(store.getState() as RootState);
      expect(ingredients).toEqual(mockIngredientsData);
    });


    it('should select errorMessage correctly', () => {
      store.dispatch(fetchIngs.rejected(new Error('Test error'), '', undefined, 'Test error'));
      const errorMessage = ingSelectors.errSel(store.getState() as RootState);
      expect(errorMessage).toBe('Test error');
    });
  });
});