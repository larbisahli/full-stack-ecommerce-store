import NotFound from '@store/assets/icons/not-found';
import ItemCard from '@store/components/item-card';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

const Products = React.forwardRef(
  ({ items = [] }: any, ref: React.RefObject<HTMLDivElement>) => {
    return (
      <div
        className="w-full mt-35px xxl:mt-60px px-4 lg:px-35px mb-26 mb-40"
        ref={ref}
      >
        {!isEmpty(items) && (
          <div className="my-8 font-semibold text-xl">Trending now</div>
        )}
        {items.length ? (
          <div className=" shadow-md border border-gray-100 py-4 rounded">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols- xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 md:gap-4 2xl:gap-5">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-8 mb-4 flex items-center justify-center">
              <button className="hover:bg-gray-50 border border-solid w-[402px] border-gray-400 rounded py-2 px-5 font-semibold">
                Show more results
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-10px md:pt-40px lg:pt-20px pb-40px">
            <NotFound width="100%" />
            <h3 className="text-24px text-gray-900 font-bold mt-35px mb-0 text-center">
              No product found :(
            </h3>
          </div>
        )}
      </div>
    );
  }
);

Products.displayName = 'Products';

export default Products;
