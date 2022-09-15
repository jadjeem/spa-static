import React, { useCallback } from 'react';
import NextImage from './image';

const ProductItem = ({ product, onClick }) => {
  const { images, name, price } = product.attributes;
  const handleClick = useCallback(() => {
    onClick(product);
    window.scroll({ top: 33, behavior: 'smooth' });
  }, [onClick, product]);
  return (
    <div className='hover:bg-gray-200 relative w-44' onClick={handleClick}>
      <NextImage
        key={'product-image' + product.id}
        className=' bg-transparent'
        media={{ data: images.data[0] }}
      />
      <div className='p-2'>
        <h3>{name}</h3>
        <div className='flex flex-row-reverse gap-2'>
          <span className='text-red-500 font-bold'>{price}</span>
          <span className='text-red-500 font-bold'>ل.س</span>
        </div>
      </div>
      <div className='absolute left-0 top-0 w-full h-full opacity-0 bg-black hover:opacity-10 hover:cursor-pointer' />
    </div>
  );
};

export default ProductItem;
