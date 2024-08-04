import Modal from 'react-modal';
import { API_URL } from '../const.js';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const customStyles = {
  overlay: {
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    inset: "50% auto auto 50%",
    padding: '0',
    border: 'none',
    borderRadius: '0',
    background: 'transparent',
    overflow: 'auto',
  },
}

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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel='Product Modal'>
      <div className='modal'>
        <img className='modal__image' src={`${API_URL}${data.img}`} alt={data.title} />
        <div className='modal__content'>
          <h2 className='modal__title'>{data.title}</h2>
          <p className='modal__price'>{data.price} ₽</p>

          <ul className='modal__additional'>
            {Object.entries(data.additional).map(([key, value]) => (
              <li className='modal__additional-item' key={key}>
                <span className='modal__additional-name'>{key}:</span>
                <span className='modal__additional-value'>{value}</span>
              </li>
            ))}
          </ul>

          <div className='modal__footer'>
            <div className="modal__quantity quantity">
              <button className="quantity__btn quantity__btn_minus" type="button" aria-label="Уменьшить количество" onClick={handleDecrease}>
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="12" height="2" fill="currentColor"/>
                </svg>
              </button>

              <input className="quantity__input" type="number" value={quantity} readOnly />

              <button className="quantity__btn quantity__btn_plus" type="button" aria-label="Увеличить количество" onClick={handleIncrease}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="5.25" width="12" height="1.5" fill="currentColor"/>
                  <rect x="5.25" y="12" width="12" height="1.5" transform="rotate(-90 5.25 12)" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <button className="modal__submit" form="order" onClick={handleAddToCart}>Добавить</button>
          </div>
        </div>
        
        <button className='modal__close' onClick={onRequestClose}>
          <svg className='modal__close-icon' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5.71228" y="14.1975" width="12" height="1.5" transform="rotate(-45 5.71228 14.1975)" fill="currentColor"/>
            <rect x="14.1976" y="15.2582" width="12" height="1.5" transform="rotate(-135 14.1976 15.2582)" fill="currentColor"/>
          </svg>
        </button>
      </div>

    </Modal>
  );
};