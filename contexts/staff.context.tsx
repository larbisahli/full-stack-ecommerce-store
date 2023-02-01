import type { StaffType } from '@ts-types/generated';
import React, { Dispatch, SetStateAction, useState } from 'react';

export interface State {
  staffInfo: StaffType;
  setStaffInfo: Dispatch<SetStateAction<StaffType>>;
}

const initialState = {
  staffInfo: {} as StaffType,
  setStaffInfo: () => undefined
};

export const StaffInfoContext = React.createContext<State>(initialState);

StaffInfoContext.displayName = 'StaffInfoContext';

export const StaffInfoProvider: React.FC = ({ ...props }) => {
  const [staffInfo, setStaffInfo] = useState<StaffType | null>({} as StaffType);
  return (
    <StaffInfoContext.Provider value={{ staffInfo, setStaffInfo }} {...props} />
  );
};
