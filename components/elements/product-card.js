import React from 'react';
import Markdown from 'react-markdown';
import NextImage from './image';

const ProductCard = ({ product }) => {
  const { name, price, note, description, images } = product.attributes;
  return (
    <div className='flex flex-row-reverse flex-wrap-reverse justify-between py-4 px-8 border-gray-400 border-b-2'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-5xl'>{name}</h2>
        <div className='flex flex-row-reverse gap-2 px-4'>
          <span className='text-red-500 font-bold'>{price}</span>
          <span className='text-red-500 font-bold'>ل.س</span>
        </div>
        <Markdown>{description}</Markdown>
        <p className='text-center italic'>{note}</p>
      </div>
      <NextImage width='400' height='400' media={{ data: images.data[0] }} />
    </div>
  );
};

export default ProductCard;
