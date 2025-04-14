"use client";

import { useContext } from "react";
import { ThemeContext } from "components/theme/themeProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useTheme 必须包裹在 ThemeProvider 内使用");
  }

  return {
    theme: context.theme,
    setTheme: context.setTheme,
    toggleTheme: () => 
      context.setTheme(context.theme === "light" ? "dark" : "light")
  };
};