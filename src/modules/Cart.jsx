import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx'
import { CartProduct } from './CartItem.jsx'
import { Loader } from './Loader.jsx';
import { useOrder } from '../context/OrderContext.jsx';
import { API_URL } from '../const.js';
import Modal from 'react-modal';
import s from './CartModal.module.css';
import st from './Cart.module.css';

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

      <section className={st.cart}>
        <div className={`container ${st.container}`}>
          <h2 className={`h2 ${st.title}`}>Корзина ({totalQuantity})</h2>
  
          <ul className={st.list}>
            {cart ? cart.map((item) => (<CartProduct key={item.id} {...item}/>)) : <Loader/>}
          </ul>

          <div className={st.info}>
            <p className={st.text}>Итого:</p>
            <p className={st.price}>{totalPrice}&nbsp;₽</p>
      
            <button className={st.submit} form="order" type="button" onClick={handleSubmit}>Заказать</button>
          </div>
        </div>

        <Modal
          className={s.modal}
          overlayClassName={s.overlay}
          onRequestClose={closeModal}
          isOpen={modalIsOpen}
        >
          <h2 className={s.title}>
            {orderStatus === 'success'
              ? `Заказ успешно отправлен! Номер заказа: ${orderId}`
              : `Произошла ошибка при отправке заказа`
            }
          </h2>
          <button className={s.close} type="button" onClick={closeModal}>Закрыть</button>
        </Modal>
      </section>
    </>
  )
}