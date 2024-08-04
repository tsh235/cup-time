import Modal from 'react-modal';
import { API_URL } from '../const.js';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import s from './ProductModal.module.css';

Modal.setAppElement('#root');

export const ProductModal = ({isOpen, onRequestClose, data}) => {
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useCart();

  if (!data) return null;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(data, quantity);
    onRequestClose();
  };

  return (
    <Modal
      className={s.modal}
      overlayClassName={s.overlay}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={data.title}
    >
      <img className={s.image} src={`${API_URL}${data.img}`} alt={data.title} />

      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.title}>{data.title}</h2>
          <p className={s.price}>{data.price}&nbsp;₽</p>
        </div>

        <ul className={s.list}>
          {Object.entries(data.additional).map(([key, value]) => (
            <li className={s.item} key={key}>
              <span className={s.field}>{key}:</span>
              <span className={s.value}>{value}</span>
            </li>
          ))}
        </ul>

        <div className={s.footer}>
          <div className={`quantity ${s.quantity}`}>
            <button className="quantity__btn" type="button" aria-label="Уменьшить количество" onClick={handleDecrease}>
              <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="12" height="2" fill="currentColor"/>
              </svg>
            </button>

            <input className="quantity__input" type="number" value={quantity} readOnly />

            <button className="quantity__btn" type="button" aria-label="Увеличить количество" onClick={handleIncrease}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="5.25" width="12" height="1.5" fill="currentColor"/>
                <rect x="5.25" y="12" width="12" height="1.5" transform="rotate(-90 5.25 12)" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <button className={s.submit} form="order" onClick={handleAddToCart}>Добавить</button>
        </div>
      </div>
      
      <button className={s.close} onClick={onRequestClose}>
        <svg className={s.icon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5.71228" y="14.1975" width="12" height="1.5" transform="rotate(-45 5.71228 14.1975)" fill="currentColor"/>
          <rect x="14.1976" y="15.2582" width="12" height="1.5" transform="rotate(-135 14.1976 15.2582)" fill="currentColor"/>
        </svg>
      </button>
    </Modal>
  );
};