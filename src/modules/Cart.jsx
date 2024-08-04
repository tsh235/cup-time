import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx'
import { CartProduct } from './CartItem.jsx'
import { Loader } from './Loader.jsx';
import { useOrder } from '../context/OrderContext.jsx';
import { API_URL } from '../const.js';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { cart, clearCart } = useCart();
  const {orderDetails, clearOrderDetails} = useOrder();

  const totalPrice = cart ? cart.reduce((acc, item) => (acc + item.quantity * item.price), 0) : 0;
  const totalQuantity = cart ? cart.reduce((acc, item) => (acc + item.quantity), 0) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...orderDetails,
      items: cart.map(item => ({id: item.id, quantity: item.quantity})),
    };
    
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отравке заказа');
      }


      const result = await response.json();
      setOrderStatus('success');
      setOrderId(result.order.id);
      clearCart();
      clearOrderDetails();

    } catch (error) {
      setOrderStatus('error');
      console.error(`Ошибка: ${error}`);
    } finally {
      setModalIsOpen(true);
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <>
      <h1 className="visually-hidden">Корзина товаров</h1>

      <section className="cart">
        <div className="container cart__container">
          <h2 className="cart__title h2">Корзина ({totalQuantity})</h2>
  
          <ul className="cart__list">
            {cart ? cart.map((item) => (<CartProduct key={item.id} {...item}/>)) : <Loader/>}
          </ul>

          <div className="cart__info">
            <p className="cart__total-text">Итого:</p>
            <p className="cart__total-price">{totalPrice}&nbsp;₽</p>
      
            <button className="cart__submit" form="order" type="button" onClick={handleSubmit}>Заказать</button>
          </div>
        </div>

        <Modal
          className="modal-cart"
          overlayClassName="modal-cart__overlay"
          onRequestClose={closeModal}
          isOpen={modalIsOpen}
        >
          <h2 className="modal-cart__title">
            {orderStatus === 'success'
              ? `Заказ успешно отправлен! Номер заказа: ${orderId}`
              : `Произошла ошибка при отправке заказа`
            }
          </h2>
          <button className="modal-cart__close" type="button" onClick={closeModal}>Закрыть</button>
        </Modal>
      </section>
    </>
  )
}