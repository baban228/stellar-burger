import reducer, {
  fetch_order_burger,
  fetch_order_by_number,
  fetch_orders,
  order_actions,
} from './slice_order';

const mockOrder = {
  _id: 'order1',
  ingredients: ['ingredient1', 'ingredient2'],
  status: 'done',
  name: 'Test Order',
  number: 123,
  createdAt: '2025-06-01T00:00:00.000Z',
  updatedAt: '2025-06-01T00:00:00.000Z',
};
const mockOrdersList = [
  mockOrder,
  { ...mockOrder, _id: 'order2', number: 124 },
];

describe('orders slice reducer', () => {
  const initialState = {
    orders: [],
    order: null,
    is_loading: false,
    error_message: null,
  };

  it('should return the initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('synchronous actions', () => {
    it('should handle order_modal_data_action', () => {
      const action = order_actions.order_modal_data_action(mockOrder);
      const state = reducer(initialState, action);
      expect(state.order).toEqual(mockOrder);
    });

    it('should handle clear_order_modal_data_action', () => {
      const stateWithOrder = { ...initialState, order: mockOrder };
      const action = order_actions.clear_order_modal_data_action();
      const state = reducer(stateWithOrder, action);
      expect(state.order).toBeNull();
    });
  });

  describe('fetch_order_burger', () => {
    it('should set is_loading to true and clear error on pending', () => {
      const action = { type: fetch_order_burger.pending.type };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(true);
      expect(state.error_message).toBeNull();
    });

    it('should handle fulfilled', () => {
      const action = {
        type: fetch_order_burger.fulfilled.type,
        payload: mockOrder,
      };
      const state = reducer(initialState, action);
      expect(state.order).toEqual(mockOrder);
      expect(state.is_loading).toBe(false);
    });

    it('should handle rejected', () => {
      const action = {
        type: fetch_order_burger.rejected.type,
        payload: 'Order creation error',
      };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBe('Order creation error');
    });
  });

  describe('fetch_order_by_number', () => {
    it('should set is_loading to true and clear error on pending', () => {
      const action = { type: fetch_order_by_number.pending.type };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(true);
      expect(state.error_message).toBeNull();
    });

    it('should handle fulfilled', () => {
      const action = {
        type: fetch_order_by_number.fulfilled.type,
        payload: mockOrder,
      };
      const state = reducer(initialState, action);
      expect(state.order).toEqual(mockOrder);
      expect(state.is_loading).toBe(false);
    });

    it('should handle rejected', () => {
      const action = {
        type: fetch_order_by_number.rejected.type,
        payload: 'Fetch order by number error',
      };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBe('Fetch order by number error');
    });
  });

  describe('fetch_orders', () => {
    it('should set is_loading to true and clear error on pending', () => {
      const action = { type: fetch_orders.pending.type };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(true);
      expect(state.error_message).toBeNull();
    });

    it('should handle fulfilled', () => {
      const action = {
        type: fetch_orders.fulfilled.type,
        payload: mockOrdersList,
      };
      const state = reducer(initialState, action);
      expect(state.orders).toEqual(mockOrdersList);
      expect(state.is_loading).toBe(false);
    });

    it('should handle rejected', () => {
      const action = {
        type: fetch_orders.rejected.type,
        payload: 'Fetch all orders error',
      };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBe('Fetch all orders error');
    });
  });
});