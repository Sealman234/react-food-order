import React from 'react';

const CartContext = React.createContext({
  // Better IDE support and autocomplete
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
