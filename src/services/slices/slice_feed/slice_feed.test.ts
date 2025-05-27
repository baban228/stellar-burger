// src/services/slices/slice_feed/slice_feed.test.ts

import { configureStore } from '@reduxjs/toolkit';
import feed_slice, { 
  fetch_feed, 
  feed_selectors, 
  initialState as feed_initial_state, 
  TFeed_State 
} from './slice_feed';
import { TOrdersData } from '@utils-types';

type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const mockOrdersData: TOrdersData = {
  orders: [
    { 
      _id: '1', 
      ingredients: ['ingredient1', 'ingredient2'], 
      status: 'done', 
      number: 1, 
      name: 'Order 1', 
      createdAt: '2023-10-01T12:00:00Z', 
      updatedAt: '2023-10-01T12:05:00Z' 
    },
    { 
      _id: '2', 
      ingredients: ['ingredient3'], 
      status: 'pending', 
      number: 2, 
      name: 'Order 2', 
      createdAt: '2023-10-01T13:00:00Z', 
      updatedAt: '2023-10-01T13:05:00Z' 
    }
  ],
  total: 100,
  totalToday: 50
};

type RootState = {
  feed: TFeed_State;
};

describe('Feed Slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        feed: feed_slice,
      },
    });
  });

  describe('fetch_feed', () => {
    
    it('should handle fulfilled state', async () => {
      await store.dispatch(fetch_feed.fulfilled(mockOrdersData, ''));

      const state = store.getState() as RootState;
      expect(state.feed.orders).toEqual(mockOrdersData.orders);
      expect(state.feed.total).toBe(mockOrdersData.total);
      expect(state.feed.totalToday).toBe(mockOrdersData.totalToday);
      expect(state.feed.is_loading).toBe(false);
      expect(state.feed.error_message).toBe(null);
    });

    it('should handle rejected state', async () => {
      await store.dispatch(fetch_feed.rejected(new Error('Test error'), '', undefined, 'Test error'));

      const state = store.getState() as RootState;
      expect(state.feed.is_loading).toBe(false);
      expect(state.feed.error_message).toBe('Test error');
    });
  });

  describe('Selectors', () => {
    it('should select orders correctly', () => {
      store.dispatch(fetch_feed.fulfilled(mockOrdersData, ''));
      const orders = feed_selectors.orders_selector(store.getState() as RootState);
      expect(orders).toEqual(mockOrdersData.orders);
    });

    it('should select total correctly', () => {
      store.dispatch(fetch_feed.fulfilled(mockOrdersData, ''));
      const total = feed_selectors.total_selector(store.getState() as RootState);
      expect(total).toBe(mockOrdersData.total);
    });

    it('should select totalToday correctly', () => {
      store.dispatch(fetch_feed.fulfilled(mockOrdersData, ''));
      const totalToday = feed_selectors.total_today_selector(store.getState() as RootState);
      expect(totalToday).toBe(mockOrdersData.totalToday);
    });

    it('should select errorMessage correctly', () => {
      store.dispatch(fetch_feed.rejected(new Error('Test error'), '', undefined, 'Test error'));
      const errorMessage = feed_selectors.error_message_selector(store.getState() as RootState);
      expect(errorMessage).toBe('Test error');
    });
  });
});