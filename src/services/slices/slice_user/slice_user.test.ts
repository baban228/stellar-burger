import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  fetch_register_user,
  user_selectors,
  user_slice
} from './slice_user';
import {
  registerUserApi
} from '../../../utils/burger-api';

const rootReducer = combineReducers({
  user: user_slice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

jest.mock('../../../utils/burger-api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn()
}));

describe('User Slice', () => {
  const store = configureStore({
    reducer: rootReducer
  });

  it('should initialize with correct initial state', () => {
    const state = store.getState().user;
    expect(state).toEqual({
      user_data: null,
      is_auth_checked: false,
      is_loading: true,
      error_message: null
    });
  });

  it('should handle successful user registration', async () => {
    const mockResponse = { user: { name: 'John Doe', email: 'john@example.com' } };
    (registerUserApi as jest.Mock).mockResolvedValue(mockResponse);

    await store.dispatch(fetch_register_user({ name: 'John', email: 'john@example.com', password: 'password' }));

    const state = store.getState().user;
    expect(state.user_data).toEqual(mockResponse.user);
    expect(state.is_auth_checked).toBe(true);
    expect(state.is_loading).toBe(false);
    expect(state.error_message).toBeNull();
  });

  it('should correctly select user data', () => {
    const mockState: RootState = {
      user: {
        user_data: { name: 'John Doe', email: 'john@example.com' },
        is_auth_checked: true,
        is_loading: false,
        error_message: null
      }
    };

    expect(user_selectors.user_selector(mockState)).toEqual(mockState.user.user_data);
    expect(user_selectors.is_auth_checked_selector(mockState)).toBe(true);
    expect(user_selectors.is_loading_selector(mockState)).toBe(false);
    expect(user_selectors.error_message_selector(mockState)).toBeNull();
  });
});