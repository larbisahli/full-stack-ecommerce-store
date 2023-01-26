import SearchIcon from '@store/assets/icons/search-icon';
import { useSearch } from '@store/contexts/search/use-search';
import React from 'react';

import {
  SearchOutlineBase,
  SearchOutlineIconWrapper,
  SearchOutlineInput
} from './utils/theme';

type SearchOutlineProps = {
  className?: string;
  id?: string;
  [key: string]: unknown;
};

const SearchOutline = React.forwardRef<HTMLInputElement, SearchOutlineProps>(
  ({ className, ...props }, ref) => {
    const { searchTerm, setSearchTerm } = useSearch();
    const onSearch = (e) => {
      e.preventDefault();
      const { value } = e.currentTarget;
      setSearchTerm(value);
    };
    const onSubmit = (e) => e.preventDefault();

    const classNames = SearchOutlineBase + ' ' + className;

    return (
      <form noValidate role="search" className={classNames} onSubmit={onSubmit}>
        <span className={SearchOutlineIconWrapper}>
          <SearchIcon color="#999999" />
        </span>
        <label htmlFor={props.id || 'search-outline'} className="sr-only">
          {props.id || 'search-outline'}
        </label>
        <input
          type="search"
          placeholder="Search your medicine here"
          className={SearchOutlineInput}
          id={props.id || 'search-outline'}
          value={searchTerm}
          onChange={onSearch}
          autoComplete="off"
          ref={ref}
          {...props}
        />
      </form>
    );
  }
);

export default SearchOutline;
