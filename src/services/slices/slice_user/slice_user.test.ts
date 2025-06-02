import reducer, {
  fetch_register_user,
  fetch_login_user,
  fetch_user,
  fetch_logout,
  logout_user,
} from './slice_user';

// Mock user object for tests
const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
};

describe('user slice reducer', () => {
  const initialState = {
    user_data: null,
    is_auth_checked: false,
    is_loading: true,
    error_message: null,
  };

  it('should return the initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle logout_user action', () => {
    const modifiedState = {
      user_data: mockUser,
      is_auth_checked: true,
      is_loading: false,
      error_message: 'Some error',
    };
    const nextState = reducer(modifiedState, logout_user());
    expect(nextState).toEqual({
      user_data: null,
      is_auth_checked: false,
      is_loading: false,
      error_message: null,
    });
  });

  describe('fetch_register_user', () => {
    it('should set is_loading to true on pending', () => {
      const action = { type: fetch_register_user.pending.type };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const action = {
        type: fetch_register_user.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = reducer(initialState, action);
      expect(state.user_data).toEqual(mockUser);
      expect(state.is_auth_checked).toBe(true);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBeNull();
    });

    it('should handle rejected', () => {
      const action = {
        type: fetch_register_user.rejected.type,
        payload: 'Registration error',
      };
      const state = reducer(initialState, action);
      expect(state.is_auth_checked).toBe(false);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBe('Registration error');
    });
  });

  describe('fetch_login_user', () => {
    it('should set is_loading to true on pending', () => {
      const action = { type: fetch_login_user.pending.type };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const action = {
        type: fetch_login_user.fulfilled.type,
        payload: { user: mockUser, accessToken: 'token', refreshToken: 'ref' },
      };
      const state = reducer(initialState, action);
      expect(state.user_data).toEqual(mockUser);
      expect(state.is_auth_checked).toBe(true);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBeNull();
    });

    it('should handle rejected', () => {
      const action = {
        type: fetch_login_user.rejected.type,
        payload: 'Login error',
      };
      const state = reducer(initialState, action);
      expect(state.is_auth_checked).toBe(true);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBe('Login error');
    });
  });

  describe('fetch_user', () => {
    it('should set is_loading to true on pending', () => {
      const action = { type: fetch_user.pending.type };
      const state = reducer(initialState, action);
      expect(state.is_loading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const action = {
        type: fetch_user.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = reducer(initialState, action);
      expect(state.user_data).toEqual(mockUser);
      expect(state.is_auth_checked).toBe(true);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBeNull();
    });

    it('should handle rejected', () => {
      const action = {
        type: fetch_user.rejected.type,
        payload: 'Fetch user error',
      };
      const state = reducer(initialState, action);
      expect(state.is_auth_checked).toBe(true);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBe('Fetch user error');
    });
  });

  describe('fetch_logout', () => {
    it('should handle fulfilled by clearing user data', () => {
      const filledState = {
        user_data: mockUser,
        is_auth_checked: true,
        is_loading: false,
        error_message: null,
      };
      const action = { type: fetch_logout.fulfilled.type };
      const state = reducer(filledState, action);
      expect(state.user_data).toBeNull();
      expect(state.is_auth_checked).toBe(false);
      expect(state.is_loading).toBe(false);
      expect(state.error_message).toBeNull();
    });
  });
});