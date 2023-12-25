"use client";
// context/WalletContext.tsx
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

interface WalletState {
  $1: number;
  $5: number;
  $10: number;
  total: number;
}

type WalletAction = {
  type: "UPDATE_NOTE";
  payload: { denomination: string; count: number };
};

interface WalletContextType {
  state: WalletState;
  dispatch: Dispatch<WalletAction>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialState: WalletState = {
  $1: 0,
  $5: 0,
  $10: 0,
  total: 0,
};

const walletReducer = (
  state: WalletState,
  action: WalletAction,
): WalletState => {
  switch (action.type) {
    case "UPDATE_NOTE":
      const { denomination, count } = action.payload;
      const updatedState = { ...state, [denomination]: Math.max(0, count) };
      updatedState.total = Object.values(updatedState).reduce(
        (sum, val) => sum + val,
        0,
      );
      return updatedState;
    default:
      return state;
  }
};

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export { WalletProvider, useWallet };
