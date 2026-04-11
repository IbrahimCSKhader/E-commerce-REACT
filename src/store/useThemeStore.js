import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: "light",
      setMode: (mode) => set({ mode }),
      toggleTheme: () =>
        set({ mode: get().mode === "light" ? "dark" : "light" }),
    }),
    {
      name: "theme-mode",
    },
  ),
);

export default useThemeStore;
