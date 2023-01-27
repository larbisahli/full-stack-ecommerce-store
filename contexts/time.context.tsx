import React, { Dispatch, SetStateAction, useState } from 'react';

export interface State {
  current: number;
  setTime: Dispatch<SetStateAction<{ current: number }>>;
}

const initialState = {
  current: Date.now(),
  setTime: () => undefined
};

export const TimeCacheContext = React.createContext<State>(initialState);

TimeCacheContext.displayName = 'TimeCacheContext';

export const TimeCacheProvider: React.FC = ({ ...props }) => {
  const [{ current }, setTime] = useState<{ current: number }>({
    current: Date.now()
  });
  return <TimeCacheContext.Provider value={{ current, setTime }} {...props} />;
};
