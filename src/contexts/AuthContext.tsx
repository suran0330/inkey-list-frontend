"use client";

import type React from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateJoined: string;
  isInsider: boolean;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'OPEN_LOGIN_MODAL' }
  | { type: 'CLOSE_LOGIN_MODAL' }
  | { type: 'OPEN_SIGNUP_MODAL' }
  | { type: 'CLOSE_SIGNUP_MODAL' }
  | { type: 'UPDATE_USER'; user: User }
  | { type: 'LOAD_USER'; user: User | null };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
        isLoading: false,
        isLoginModalOpen: false,
        isSignupModalOpen: false
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.loading
      };

    case 'OPEN_LOGIN_MODAL':
      return {
        ...state,
        isLoginModalOpen: true,
        isSignupModalOpen: false
      };

    case 'CLOSE_LOGIN_MODAL':
      return {
        ...state,
        isLoginModalOpen: false
      };

    case 'OPEN_SIGNUP_MODAL':
      return {
        ...state,
        isSignupModalOpen: true,
        isLoginModalOpen: false
      };

    case 'CLOSE_SIGNUP_MODAL':
      return {
        ...state,
        isSignupModalOpen: false
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user
      };

    case 'LOAD_USER':
      return {
        ...state,
        user: action.user,
        isLoading: false
      };

    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openSignupModal: () => void;
  closeSignupModal: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Mock user database (in a real app, this would be a backend service)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    dateJoined: '2024-01-15',
    isInsider: true,
    orders: [
      {
        id: 'order-1',
        date: '2024-01-20',
        total: 23.98,
        status: 'delivered',
        items: [
          { productId: 'hyaluronic-acid-serum', productName: 'Hyaluronic Acid Serum', quantity: 1, price: 7.99 },
          { productId: 'niacinamide', productName: 'Niacinamide', quantity: 2, price: 7.99 }
        ]
      },
      {
        id: 'order-2',
        date: '2024-02-01',
        total: 15.99,
        status: 'shipped',
        items: [
          { productId: 'vitamin-c-serum', productName: 'Vitamin C Serum', quantity: 1, price: 15.99 }
        ]
      }
    ]
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isLoginModalOpen: false,
    isSignupModalOpen: false
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('inkey-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOAD_USER', user });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        dispatch({ type: 'LOAD_USER', user: null });
      }
    } else {
      dispatch({ type: 'LOAD_USER', user: null });
    }
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('inkey-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('inkey-user');
    }
  }, [state.user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', loading: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication (in a real app, this would validate against a backend)
    const user = mockUsers.find(u => u.email === email);

    if (user && password === 'password') { // Simple mock password check
      dispatch({ type: 'LOGIN_SUCCESS', user });
      return true;
    } else {
      dispatch({ type: 'SET_LOADING', loading: false });
      return false;
    }
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', loading: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      dispatch({ type: 'SET_LOADING', loading: false });
      return false; // User already exists
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      firstName,
      lastName,
      dateJoined: new Date().toISOString().split('T')[0],
      isInsider: false,
      orders: []
    };

    mockUsers.push(newUser);
    dispatch({ type: 'LOGIN_SUCCESS', user: newUser });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_LOGIN_MODAL' });
  };

  const closeLoginModal = () => {
    dispatch({ type: 'CLOSE_LOGIN_MODAL' });
  };

  const openSignupModal = () => {
    dispatch({ type: 'OPEN_SIGNUP_MODAL' });
  };

  const closeSignupModal = () => {
    dispatch({ type: 'CLOSE_SIGNUP_MODAL' });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', user });
  };

  const value: AuthContextType = {
    state,
    login,
    signup,
    logout,
    openLoginModal,
    closeLoginModal,
    openSignupModal,
    closeSignupModal,
    updateUser,
    isAuthenticated: !!state.user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
