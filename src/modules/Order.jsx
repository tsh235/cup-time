import { useOrder } from '../context/OrderContext.jsx'

export const Order = () => {
  const {orderDetails, updateOrderDetails} = useOrder();

  const handleChange = ({target}) => {
    const {name, value} = target;
    updateOrderDetails(name, value);
  }

  return (
    <section className="order">
      <div className="container">
        <h2 className="order__title h2">Доставка</h2>

        <form id="order" className="order__form">
          <fieldset className="order__inputs">
            <input
              className="order__input" 
              type="text" 
              name="name" 
              placeholder="Имя" 
              value={orderDetails.name}
              onChange={handleChange}
            />
            <input
              className="order__input" 
              type="text" 
              name="phone" 
              placeholder="Телефон" 
              value={orderDetails.phone}
              onChange={handleChange}
            />
            <input
              className="order__input order__input_address" 
              type="text" 
              name="address" 
              placeholder="Адрес"
              value={orderDetails.address}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="order__payments">
            <legend className="order__legend">Оплата:</legend>
            <label className="order__label">
              <input 
                className="order__radio"
                type="radio"
                name="payment"
                value="card"
                checked={orderDetails.payment === 'card'}
                onChange={handleChange}
              />
              Картой
            </label>

            <label className="order__label">
              <input 
                className="order__radio"
                type="radio"
                name="payment"
                value="cash"
                checked={orderDetails.payment === 'cash'}
                onChange={handleChange}
              />
              Наличными
            </label>
          </fieldset>
        </form>
      </div>
    </section>
  )
}