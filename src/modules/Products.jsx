import { useEffect } from 'react';
import { Product } from './Product.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader.jsx';

export const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { products, setCategory, categories, productsRef } = useProducts();
  
  useEffect(() => {
    setCategory(category);
  }, [category, setCategory]);

  const categoryTitle = categories[category] || 'Товары';

  return (
    <section className="products" ref={productsRef}>
      <div className="container">
        <h2 className="products__title h2">{categoryTitle}</h2>

        <ul className="products__list">
          {products.length ?
            products.map((item) => (<Product key={item.id} {...item}/>)) :
            (<Loader/>)
          }
        </ul>
      </div>
    </section>
  );
}