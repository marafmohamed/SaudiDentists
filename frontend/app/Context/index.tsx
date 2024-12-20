"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the structure of the user object and state

interface State {
  user: string | null;
  admin: string | null;
  lang: "ar" | "en"; // Arabic or English
}

type Action =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT" }
  | { type: "LOGIN_AD"; payload: string }
  | { type: "LOGOUT_AD" }
  | { type: "SET_LANGUAGE"; payload: "ar" | "en" };

interface AppContextValue extends State {
  dispatch: React.Dispatch<Action>;
  baseUrl: string;
}

// Create the context
const AppContext = createContext<AppContextValue | undefined>(undefined);

// Reducer function with typed state and actions
const AuthReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "LOGIN_AD":
      return { ...state, admin: action.payload };
    case "LOGOUT_AD":
      return { ...state, admin: null };
    case "SET_LANGUAGE":
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};

// Props for the AppProvider component
interface AppProviderProps {
  children: ReactNode;
}

// Context Provider
export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, { user: null, admin: null, lang: "en" }); // Default language is English
  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL as string;

  return (
    <AppContext.Provider value={{ ...state, dispatch, baseUrl }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used inside an AppProvider");
  }
  return context;
}
