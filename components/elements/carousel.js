import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as DefaultCarousel } from 'react-responsive-carousel';
// import Image from 'next/image';
import classNames from 'classnames';
import NextImage from './image';
import Image from 'next/image';

const Carousel = ({ images }) => {
  // const [current, setCurrent] = useState(0);

  // const handleSelect = useCallback((e) => setCurrent(e.target.value), []);

  // useEffect(() => {
  //   const clearId = setTimeout(() => {
  //     let next = current === images.length - 1 ? 0 : current + 1;
  //     setCurrent(next);
  //     console.log(next);
  //   }, 6000);
  //   return () => clearInterval(clearId);
  // }, [current]);

  const listOfImages = useMemo(
    () =>
      images.map((img, i) => (
        <div className='h-full' key={'carousel-image' + i}>
          <Image className='h-full' alt='' src={img.attributes.url} />
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
      {/* <div className='w-full h-full flex justify-center'>
        <div className='w-96 h-96 flex flex-col'>
          <div className='displayed-image-container'>
            {images.map((img, i) => (
              current == i ? (
                <Image
                key={'images' + i}
                className='displayed-image'
                src={img}
                // width='100%'
                // height='100%'
                layout='fill'
              />
              ) : (<></>)
            ))}
          </div>
        </div>
        {/* <div></div>
        <div></div> */}
      {/* <div className='images-list'>
          <ul className='flex flex-row justify-around w-full'>
          {images.map((img, i) => (
            <li key={'list' + i} className='relative h-10 w-14 hover:border-2' >
            <Image width={56} height={40}  layout='responsive' src={img} />
            </li>
            ))}
            </ul>
          </div> */}
      {/* <div className='absolute w-full bottom-10 dots-div'>
          <ul className='flex justify-center gap-4 w-full hover:bg-black hover:bg-opacity-10'>
            {images.map((_, i) => (
              <li
                key={'dots' + i}
                className={classNames(
                  'border-2 border-gray-500 bg-white shadow-2xl drop-shadow-2xl w-3 h-3 rounded-lg hover:bg-yellow-500 hover:border-yellow-500',
                  i === current ? "border-yellow-500" : ''
                )}
                role='button'
                value={i}
                onClick={handleSelect}
              />
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .displayed-image-container {
          flex: 7;
          width: 100%;
        }
        .displayed-image {
          transition: display 2s ease-out;
        }
        .images-list {
          display: flex;
          flex: 1;
          height: 40px;
        }
      `}</style> */}
    </div>
  );
};

export default Carousel;
