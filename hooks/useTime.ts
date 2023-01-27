import { TimeCacheContext } from '@contexts/time.context';
import { useContext } from 'react';

export function useTime() {
  const { current, setTime } = useContext(TimeCacheContext);
  const revalidate = () => {
    setTime({ current: Date.now() });
  };
  return { current, revalidate };
}
