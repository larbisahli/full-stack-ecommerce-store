import React, { createContext, useReducer } from 'react';
export const StickyContext = createContext<{
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({});

const INITIAL_STATE = {
  isSticky: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STICKY':
      return {
        ...state,
        isSticky: true
      };
    case 'REMOVE_STICKY':
      return {
        ...state,
        isSticky: false
      };
    default: {
      throw new Error(`Unsupported action: ${action.type}`);
    }
  }
}

export const StickyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <StickyContext.Provider value={{ state, dispatch }}>
      {children}
    </StickyContext.Provider>
  );
};
