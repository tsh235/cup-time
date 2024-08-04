import { useState } from 'react'
import { API_URL } from '../const.js'
import { ProductModal } from './ProductModal.jsx';

export const Product = (data) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <li className="products__item">
      <a className="products__link" href="#!" onClick={openModal} aria-label={`Открыть модальное окно для ${data.title}`}>
        <article className="products__card product">
          <img className="product__img" src={`${API_URL}${data.img}`} alt={data.title} />
          <div className="product__content">
            <h3 className="product__title">{data.title}</h3>
            <p className="product__price">{data.price} ₽</p>
          </div>
        </article>
      </a>
      <ProductModal isOpen={modalIsOpen} onRequestClose={closeModal} data={data}/>
    </li>
  )
}