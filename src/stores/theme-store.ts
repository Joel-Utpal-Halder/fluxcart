import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",

  /* ===== SET THEME ===== */
  setTheme: (theme) => {
    set({ theme });

    applyTheme(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("fluxcart-theme", theme);
    }
  },

  /* ===== TOGGLE THEME ===== */
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    get().setTheme(newTheme);
  },

  /* ===== INIT THEME ===== */
  initTheme: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("fluxcart-theme") as ThemeMode | null;

    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = saved || (systemPrefersDark ? "dark" : "light");

    set({ theme: initialTheme });
    applyTheme(initialTheme);
  },
}));

/* ===== APPLY THEME TO DOCUMENT ===== */
function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}