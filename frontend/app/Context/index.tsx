"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the structure of the user object and state
interface User {
  id: string;
  name: string;
  email: string;
  // Add any additional fields based on your application's user object
}

interface State {
  user: User | null;
  language: "ar" | "en"; // Arabic or English
}

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
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
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
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
  const [state, dispatch] = useReducer(AuthReducer, { user: null, language: "en" }); // Default language is English
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
