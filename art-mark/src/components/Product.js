import React from 'react';
import './Product.css';
import CardItem from './CardItem';

function Product() {
  return (
    <div className='product'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/ArtMark.PNG'
              text='City Skyline Lettering Series'
              label='Laura Le'
            />
            <CardItem
              src='images/ArtMark2.PNG'
              text='Olivia Rodrigo Sour Tour Campaign'
              label='Laura Le'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/ArtMark3.PNG'
              text='Disguise Album Cover'
              label='Laura Le'
            />
            <CardItem
              src='images/ArtMark4.PNG'
              text='Illustrated and Hand-lettered Stickers'
              label='Laura Le'
            />
            <CardItem
              src='images/ArtMark5.PNG'
              text='Illustrated Floral Handmade Memo'
              label='Laura Le'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Product;
