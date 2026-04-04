"use client";

import { createContext, useContext } from "react";

type FeedThemeContextValue = {
  isDark: boolean;
};

const FeedThemeContext = createContext<FeedThemeContextValue | null>(null);

export function FeedThemeProvider({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return <FeedThemeContext.Provider value={{ isDark }}>{children}</FeedThemeContext.Provider>;
}

export function useFeedTheme() {
  const context = useContext(FeedThemeContext);

  if (!context) {
    throw new Error("useFeedTheme must be used within FeedThemeProvider");
  }

  return context;
}
