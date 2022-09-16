import React from 'react';
import Markdown from 'react-markdown';
import CarouselComponent from '../elements/carousel';

const Carousel = ({ data }) => {
  console.log(data.images);
  return (
    <section className='bg-primary-900 py-20 text-center flex items-center flex-col gap-8'>
      {data.title && <h2 className='title text-white mb-10'>{data.title}</h2>}
      {data.images && (
        <div className='w-full md:w-1/2 lg:w-5/12'>
          <CarouselComponent images={data.images.data} />
        </div>
      )}
      {data.info && (
        <div className='my-10 text-white'>
          {/* <Markdown>{data.info}</Markdown> */}
          <div dangerouslySetInnerHTML={{ __html: data.info }} />
        </div>
      )}
    </section>
  );
};

export default Carousel;
