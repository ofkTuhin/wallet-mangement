// context/WalletContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from "react";

type WalletAction =
  | { type: "LOAD_DATA"; payload: WalletState[] }
  | { type: "ADD_NOTE" | "REMOVE_NOTE"; payload: WalletState };

interface WalletState {
  denomination: string;
  count: number;
}

interface WalletContextType {
  state: WalletState[];
  dispatch: React.Dispatch<WalletAction>;
  addNote: (denomination: string, count: number) => void;
  removeNote: (denomination: string, count: number) => void;
}

// creating context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// initial state
const initialState: WalletState[] = [
  {
    denomination: "$1",
    count: 5,
  },
  {
    denomination: "$2",
    count: 0,
  },
  {
    denomination: "$3",
    count: 0,
  },
];

// Reducer function
const walletReducer = (
  state: WalletState[],
  action: WalletAction,
): WalletState[] => {
  switch (action.type) {
    case "LOAD_DATA":
      return action.payload;
    case "ADD_NOTE":
      return state.map((item) =>
        item.denomination === action.payload.denomination
          ? { ...item, count: item.count + action.payload.count }
          : item,
      );
    case "REMOVE_NOTE":
      return state.map((item) =>
        item.denomination === action.payload.denomination
          ? { ...item, count: Math.max(0, item.count - action.payload.count) }
          : item,
      );
    default:
      return state;
  }
};

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  useEffect(() => {
    try {
      const savedData =
        JSON.parse(localStorage.getItem("walletData")!) || initialState;
      dispatch({ type: "LOAD_DATA", payload: savedData });
    } catch (error) {
      console.error("Error loading wallet data from localStorage:", error);
    }
  }, []);

  const addNote = (denomination: string, count: number) => {
    localStorage.setItem(
      "walletData",
      JSON.stringify(
        state.map((item) =>
          item.denomination === denomination
            ? { ...item, count: item.count + count }
            : item,
        ),
      ),
    );

    dispatch({ type: "ADD_NOTE", payload: { denomination, count } });
  };

  const removeNote = (denomination: string, count: number) => {
    localStorage.setItem(
      "walletData",
      JSON.stringify(
        state.map((item) =>
          item.denomination === denomination
            ? { ...item, count: item.count - count }
            : item,
        ),
      ),
    );
    dispatch({ type: "REMOVE_NOTE", payload: { denomination, count } });
  };

  return (
    <WalletContext.Provider value={{ state, dispatch, addNote, removeNote }}>
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  const { state, dispatch, addNote, removeNote } = context;

  return { state, dispatch, addNote, removeNote };
};

export { WalletProvider, useWallet };
