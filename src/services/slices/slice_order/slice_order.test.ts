import { configureStore } from '@reduxjs/toolkit';
import ordersSlice, {
  fetch_order_burger,
  fetch_order_by_number,
  fetch_orders,
  order_actions,
  order_selectors,
  orders_slice
} from './slice_order';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../utils/burger-api';
import { Root_State } from '../../store';

jest.mock('../../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

describe('Orders Slice', () => {
  const store = configureStore({
    reducer: {
      orders: orders_slice.reducer
    }
  });

  const mockOrder = {
    _id: '123',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Test Order',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z'
  };

  const mockOrders = [
    {
      _id: '123',
      number: 1,
      ingredients: ['ingredient1'],
      status: 'done',
      name: 'Test Order 1',
      createdAt: '2023-10-01T12:00:00Z',
      updatedAt: '2023-10-01T12:00:00Z'
    },
    {
      _id: '456',
      number: 2,
      ingredients: ['ingredient2'],
      status: 'pending',
      name: 'Test Order 2',
      createdAt: '2023-10-02T12:00:00Z',
      updatedAt: '2023-10-02T12:00:00Z'
    }
  ];

  it('should initialize with correct initial state', () => {
    const state = store.getState().orders;
    expect(state).toEqual({
      orders: [],
      order: null,
      is_loading: false,
      error_message: null
    });
  });

  it('should handle successful order creation', async () => {
    (orderBurgerApi as jest.Mock).mockResolvedValue({ order: mockOrder });

    await store.dispatch(fetch_order_burger(['ingredient1', 'ingredient2']));

    const state = store.getState().orders;
    expect(state.order).toEqual(mockOrder);
    expect(state.is_loading).toBe(false);
    expect(state.error_message).toBeNull();
  });

  it('should handle fetching order by number', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue({ orders: [mockOrder] });

    await store.dispatch(fetch_order_by_number(1));

    const state = store.getState().orders;
    expect(state.order).toEqual(mockOrder);
    expect(state.is_loading).toBe(false);
    expect(state.error_message).toBeNull();
  });

  it('should handle fetching all orders', async () => {
    (getOrdersApi as jest.Mock).mockResolvedValue(mockOrders);

    await store.dispatch(fetch_orders());

    const state = store.getState().orders;
    expect(state.orders).toEqual(mockOrders);
    expect(state.is_loading).toBe(false);
    expect(state.error_message).toBeNull();
  });

  it('should correctly select orders data', () => {
    const mockState: Partial<Root_State> = {
      orders: {
        orders: mockOrders,
        order: mockOrder,
        is_loading: false,
        error_message: null
      }
    };

    expect(order_selectors.orders_selector(mockState as Root_State)).toEqual(mockOrders);
    expect(order_selectors.order_selector(mockState as Root_State)).toEqual(mockOrder);
    expect(order_selectors.is_loading_selector(mockState as Root_State)).toBe(false);
    expect(order_selectors.error_message_selector(mockState as Root_State)).toBeNull();
  });
});