import React from 'react';
import '../../App.css';
import Product from '../Product';
import Footer from '../Footer';
// export default function Products() {
//   return <h1 className='products'>PRODUCTS</h1>;
// }

function Products() {
  return (
    <>
    <h1 className='products'>PRODUCTS</h1>;
      <Product />
      <Footer />
    </>
  );
}

export default Products;
