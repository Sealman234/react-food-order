import React from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
  // Initial values
  const addItemToCartHandler = () => {};
  const removeItemFromCartHandler = () => {};
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
