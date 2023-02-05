import NotFound from '@store/assets/icons/not-found';
import ItemCard from '@store/components/item-card';
import { useSearch } from '@store/contexts/search/use-search';
import { useSearchable } from '@store/helpers/use-searchable';
import React from 'react';

const Products = React.forwardRef(
  ({ items }: any, ref: React.RefObject<HTMLDivElement>) => {
    const { searchTerm } = useSearch();
    const searchableItems = useSearchable(items, searchTerm, (item) => [
      item.name
    ]);

    return (
      <div
        className="w-full mt-35px xxl:mt-60px px-4 lg:px-35px mb-26 mb-40"
        ref={ref}
      >
        {searchableItems.length ? (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols- xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 md:gap-4 2xl:gap-5">
              {searchableItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-20 flex items-center justify-center">
              <button className="hover:bg-gray-50 border border-solid border-gray-400 rounded py-2 px-5 font-semibold">
                View more
              </button>
            </div>
          </>
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
