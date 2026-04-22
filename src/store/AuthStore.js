import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

      setUser: (user) =>
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            ...user,
          },
        })),

      finishHydration: () =>
        set({
          hasHydrated: true,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          hasHydrated: true,
        }),
    }),
    {
      name: "authValueInLocalStorage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.finishHydration();
      },
    },
  ),
);

export default useAuthStore;
