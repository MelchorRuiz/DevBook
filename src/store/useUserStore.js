import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // Actions
            setUser: (user, token) => set({ user, token, isAuthenticated: true }),
            clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: 'user-store',
        }
    )
);

export default useUserStore;