export type AppTheme = "light" | "dark";

export const THEME_COOKIE_NAME = "buddy-theme";

export function normalizeTheme(value?: string | null): AppTheme {
  return value === "dark" ? "dark" : "light";
}
