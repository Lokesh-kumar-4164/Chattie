import { create } from "zustand";

import {  loginAPI, logoutAPI, checkAuth as checkAuthAPI } from "../api/userApi";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,


    // Login user
    login: async (email, password) => {
        try {
            const response = await loginAPI({ email, password });
            set({
                user: response.userData || response.user,
                isAuthenticated: true,
                isLoading: false,
            });

            return { success: true };
        } catch (error) {
            set({
                isLoading: false,
            });

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed",
            };
        }
    },


    // Logout user
    logout: async () => {
        try {
            await logoutAPI();

            set({
                user: null,
                isAuthenticated: false,
            });

        } catch (error) {
            console.log("Logout error", error);
        }
    },


    // Check existing session when app loads
    checkAuth: async () => {
        try {
            set({ isLoading: true });

            const response = await checkAuthAPI();

            set({
                user: response.userData || response.user,
                isAuthenticated: true,
                isLoading: false,
            });

        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
            console.log("Check auth error", error);

        }
    },


    // Clear state manually
    clearAuth: () => {
        set({
            user: null,
            isAuthenticated: false,
        });
    },
}));

