import NotFound from '@store/assets/icons/not-found';
import ItemCard from '@store/components/item-card';
import { useCart } from '@store/contexts/cart/cart.provider';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { useSearch } from '@store/contexts/search/use-search';
import { useSearchable } from '@store/helpers/use-searchable';
import React, { useContext } from 'react';

const Products = React.forwardRef(
  ({ items }: any, ref: React.RefObject<HTMLDivElement>) => {
    const { dispatch } = useContext(DrawerContext);

    const { searchTerm } = useSearch();
    const searchableItems = useSearchable(items, searchTerm, (item) => [
      item.name
    ]);

    const { addItem, removeItem, getItem } = useCart();

    const showDetails = (item) => {
      dispatch({
        type: 'STORE_PRODUCT_DETAIL',
        payload: {
          item: item
        }
      });

      dispatch({
        type: 'SLIDE_CART',
        payload: {
          open: true
        }
      });

      dispatch({
        type: 'TOGGLE_PRODUCT_DETAIL',
        payload: {
          showDetails: true
        }
      });
    };

    console.log({ searchableItems });

    return (
      <div className="w-full mt-35px xxl:mt-60px px-4 lg:px-35px" ref={ref}>
        {searchableItems.length ? (
          <div className="grid grid-cols-1 col-gap-3 row-gap-3 mt-9 md:grid-cols-2 md:col-gap-4 md:row-gap-4 lg:grid-cols-3 xxl:grid-cols-3 xxl:col-gap-4 xxl:row-gap-4 2xxl:grid-cols-4 large:grid-cols-5">
            {searchableItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => showDetails(item)}
                value={getItem(item.id)?.quantity}
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
              />
            ))}
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
