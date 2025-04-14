"use client";
import { createContext, useContext, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  startLoading: () => void;
  endLoading: () => void;
};
const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, endLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
