import React, { useMemo } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel as DefaultCarousel } from 'react-responsive-carousel';
import classNames from 'classnames';
import NextImage from './image';
import Image from 'next/image';

const Carousel = ({ images = [] }) => {
  const listOfImages = useMemo(
    () =>
      images.map((img, i) => (
        <div className='h-full w-full relative' key={'carousel-image' + i}>
          {/* <NextImage className='h-full' layout='responsive' media={img} /> */}
          <NextImage className='h-full' layout='responsive' width='170' height='100'  media={{ data: img}} />
        </div>
      )),
    [images]
  );

  return (
    <div className='w-full h-full border-2'>
      <DefaultCarousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        renderIndicator={(handler, isSelected, index) => (
          <li
            key={'dots' + index}
            className={classNames(
              'border-2 border-gray-500 bg-white inline-block mx-2 shadow-2xl drop-shadow-2xl w-3 h-3 rounded-lg hover:bg-yellow-500 hover:border-yellow-500',
              isSelected ? 'border-yellow-500' : ''
            )}
            role='button'
            // value={i}
            onClick={handler}
          />
        )}
      >
        {listOfImages}
      </DefaultCarousel>
    </div>
  );
};

export default Carousel;
