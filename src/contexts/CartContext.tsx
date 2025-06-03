"use client";

import type React from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Product } from '@/data/products';
import { normalizeProductForCart } from '@/lib/utils/productUtils';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.product.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
          isOpen: true
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity }],
        isOpen: true
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId)
      };

    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.productId)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.items
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getShopifyItems: () => CartItem[];
  getMockItems: () => CartItem[];
  hasShopifyItems: () => boolean;
  hasMockItems: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('inkey-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', items: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('inkey-cart', JSON.stringify(state.items));

    // In a real app, you would also sync cart with user's account if logged in
    // This would allow cart persistence across devices
  }, [state.items]);

  const addItem = (product: Product, quantity = 1) => {
    // Normalize the product to ensure it's compatible with our cart system
    const normalizedProduct = normalizeProductForCart(product);
    dispatch({ type: 'ADD_ITEM', product: normalizedProduct, quantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.product.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getShopifyItems = () => {
    return state.items.filter(item => 
      'isShopifyProduct' in item.product && item.product.isShopifyProduct
    );
  };

  const getMockItems = () => {
    return state.items.filter(item => 
      !('isShopifyProduct' in item.product) || !item.product.isShopifyProduct
    );
  };

  const hasShopifyItems = () => {
    return getShopifyItems().length > 0;
  };

  const hasMockItems = () => {
    return getMockItems().length > 0;
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getItemCount,
    getSubtotal,
    getShopifyItems,
    getMockItems,
    hasShopifyItems,
    hasMockItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};