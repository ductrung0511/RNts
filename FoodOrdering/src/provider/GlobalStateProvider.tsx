// GlobalStateProvider.tsx
import React, { createContext, useContext, useState } from 'react';
import { GlobalStateInterface } from './GlobalStateInterface';

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const GlobalStateContext = createContext<{ state: GlobalStateInterface, setState: React.Dispatch<React.SetStateAction<GlobalStateInterface>> } | undefined>(undefined);

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [state, setState] = useState<GlobalStateInterface>({
    cartItems: [],
  });

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): { state: GlobalStateInterface, setState: React.Dispatch<React.SetStateAction<GlobalStateInterface>> } => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
