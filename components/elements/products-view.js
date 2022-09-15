import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import Button from './button';
import NextImage from './image';
import ProductCard from './product-card';
import ProductItem from './product-item';

const ProductsView = ({
  products,
  page = 1,
  setPage,
  totalCount = 0,
  pageSize = 1,
}) => {
  const [selected, setSelected] = useState(null);
  const totalPages = useMemo(
    () => Math.round(totalCount / pageSize) + (totalCount % pageSize !== 0),
    [totalCount, pageSize]
  );
  // const [selected, setSelected] = useState(null);
  const handleSelect = useCallback((p) => setSelected(p), []);
  const handlePrev = useCallback(() => page > 1 && setPage(page - 1), [page]);
  const handleNext = useCallback(
    () => page < totalPages && setPage(page + 1),
    [page, totalPages]
  );
  return (
    <div className='w-full flex flex-col gap-8 px-4 py-8'>
      {selected && <ProductCard product={selected} />}
      <div className='w-full flex flex-wrap justify-center lg:justify-end gap-2 lg:gap-5'>
        {products &&
          products.map((p) => (
            <ProductItem key={p.id} onClick={handleSelect} product={p} />
          ))}
      </div>
      <div className='flex flex-row-reverse justify-center lg:justify-end px-32 '>
        <button className={classNames(
          'border-2 border-solid p-2 font-semibold',
          page === 1 ? 'cursor-default bg-gray-200 font-thin' : ''
        )} onClick={handlePrev}>
          السابق
        </button>
        <span className=' h-full p-2 mx-2 font-bold'>{page}</span>
        <button className={classNames(
          'border-2 border-solid p-2 font-semibold',
          page === totalPages ? 'cursor-default bg-gray-200 font-thin' : ''
        )} onClick={handleNext}>
          التالي
        </button>
      </div>
    </div>
  );
};

export default ProductsView;
