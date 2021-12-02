import React, { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  // Why didn't we use useState on hasItems?
  // 因為 Cart 在 App 中就會因為 Click 開關購物車而重新渲染，無須透過 hasItems 來重新渲染 Cart
  // 順序: 開關 Cart 重新渲染 => 判斷 hasItems => 判斷 Order 按鈕是否出現

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItem = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // We can't write onRemove={cartItemRemoveHandler(item.id)} cause this would call the function immediately
          // So, if we want to pass params, we can use bind (the first param is not used here, so we can write anything in this place)
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          // or, we can also create an anonymous function
          // onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
