import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            folderId: "",

            // Actions
            setUser: (user, token, folderId) => set({ user, token, isAuthenticated: true, folderId }),
            clearUser: () => set({ user: null, token: null, isAuthenticated: false, folderId: "" }),
        }),
        {
            name: 'user-store',
        }
    )
);

export default useUserStore;