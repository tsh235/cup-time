import { Navigate, Route, Routes } from 'react-router-dom'
import { Products } from './Products.jsx'
import { Promo } from './Promo.jsx'
import { Cart } from './Cart.jsx'
import { Order } from './Order.jsx'

export const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/products?category=tea" />} />

        <Route path="/products" element={
          <>
            <Promo/>
            <Products/>
          </>
        }/>

        <Route path="/cart" element={
          <>
            <Cart/>
            <Order/>
          </>
        }/>
      </Routes>
    </main>
  )
}