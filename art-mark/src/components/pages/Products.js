import React from 'react';
import '../../App.css';
import Product from '../Product';
import Footer from '../Footer';

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
