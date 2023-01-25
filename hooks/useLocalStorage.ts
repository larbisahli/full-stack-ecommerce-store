import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initialValue) {
  const [StoredValue, setStoredValue] = useState(initialValue);

  const setLocalStorage = (value) => {
    try {
      setStoredValue(value);
      window?.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const item = window?.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return [StoredValue, setLocalStorage];
}
