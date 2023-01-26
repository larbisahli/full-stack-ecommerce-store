import { createContext, useContext, useState } from 'react';

const searchContext = createContext({} as any);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <searchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </searchContext.Provider>
  );
};

export const useSearch = () => useContext(searchContext);
