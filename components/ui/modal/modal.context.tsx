import type { ModalView, Nullable } from '@ts-types/custom.types';
import React from 'react';
interface State {
  view?: ModalView;
  id?: Nullable<String>;
  isOpen: boolean;
  meta: Nullable<String>;
}
type Action =
  | { type: 'open'; view?: ModalView; id?: String; meta?: String }
  | { type: 'close' };

const initialState: State = {
  view: undefined,
  isOpen: false,
  id: null,
  meta: null
};

function modalReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        view: action.view,
        id: action.id,
        isOpen: true,
        meta: action.meta
      };
    case 'close':
      return {
        ...state,
        view: undefined,
        id: null,
        isOpen: false,
        meta: null
      };
    default:
      throw new Error('Unknown Modal Action!');
  }
}

const ModalStateContext = React.createContext<State>(initialState);

ModalStateContext.displayName = 'ModalStateContext';

const ModalActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);

ModalActionContext.displayName = 'ModalActionContext';

export const ModalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, initialState);
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`);
  }
  return context;
}

export function useModalAction() {
  const dispatch = React.useContext(ModalActionContext);
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`);
  }
  return {
    openModal(view?: ModalView, id?: String, meta?: String) {
      dispatch({ type: 'open', view, id, meta });
    },
    closeModal() {
      dispatch({ type: 'close' });
    }
  };
}
