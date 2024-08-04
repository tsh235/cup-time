import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useEffect, useState } from 'react';
import { getActiveClass } from '../helpers.js';

export const Header = () => {
  const { cart } = useCart();
  const { categories } = useProducts();
  const totalQuantity = cart ? cart.reduce((acc, item) => (acc + item.quantity), 0) : 0;
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : 'auto';
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeMenu = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo-link">
          <img className="header__logo logo" src="./img/logo.svg" alt="Логотип Cup Time" width="99" height="67" />
        </Link>
        <nav className={`header__nav nav ${isNavOpen ? 'header__nav_open' : ''}`}>
          <ul className="nav__list">
            {Object.entries(categories).map(([key, value]) => (
              <li key={key} className="nav__item">
                <Link className={`nav__link link ${getActiveClass(key)}`} to={`/products?category=${key}`} onClick={closeMenu}>{value}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="header__cart-link" to="/cart" aria-label="Перейти в корзину товаров">{totalQuantity}</Link>

        <button className={`burger ${isNavOpen ? 'burger_active' : ''}`} type="button" aria-label="Мобильное меню" onClick={toggleNav}>
          <span className="burger__line"></span>
        </button>
      </div>
    </header>
  )
}