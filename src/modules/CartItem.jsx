import { useState } from 'react';
import { API_URL } from '../const.js'
import { useCart } from '../context/CartContext.jsx';

export const CartProduct = ({id, img, title, price, quantity}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    const newQuantity = itemQuantity - 1;

    if (newQuantity > 0) {
      setItemQuantity(newQuantity);
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id, 0);
    }
  };

  const handleIncrease = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    updateQuantity(id, newQuantity);
  };

  return (
    <li className="cart-item">
      <img className="cart-item__img" src={`${API_URL}${img}`} alt={title} />
      <div className="cart-item__content">
        <h3 className="cart-item__title">{title}</h3>
        <div className="cart-item__quantity quantity">
          <button className="quantity__btn quantity__btn_minus" type="button" aria-label="Уменьшить количество" onClick={handleDecrease}>
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="12" height="2" fill="currentColor"/>
            </svg>
          </button>

          <input className="quantity__input" type="number" value={quantity} readOnly/>

          <button className="quantity__btn quantity__btn_plus" type="button" aria-label="Увеличить количество" onClick={handleIncrease}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5.25" width="12" height="1.5" fill="currentColor"/>
              <rect x="5.25" y="12" width="12" height="1.5" transform="rotate(-90 5.25 12)" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <p className="cart-item__price">{price * quantity}&nbsp;₽</p>
      </div>
    </li>
  );
}