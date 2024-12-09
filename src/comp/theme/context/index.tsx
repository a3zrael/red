import { createContext } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
