import { Settings } from '@ts-types/generated';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
export interface State extends Settings {
  updateSettings: Dispatch<SetStateAction<Settings>>;
}

const initialState = {
  currency: {
    code: 'USD'
  },
  seo: {},
  socials: {},
  updateSettings: () => undefined
};

export const SettingsContext = React.createContext<State>(initialState);

SettingsContext.displayName = 'SettingsContext';

export const SettingsProvider: React.FC = ({ ...props }) => {
  const [state, updateSettings] = React.useState(initialState);
  const value = useMemo(
    () => ({
      ...state,
      updateSettings
    }),
    [state]
  );
  return <SettingsContext.Provider value={value} {...props} />;
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};
