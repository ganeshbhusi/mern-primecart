import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import { StoreApi, UseBoundStore, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserData = {
  username: string;
  password: string;
};

export interface UserAuthStore {
  login: (data: UserData) => Promise<{ success: boolean; message: string }>;
  register: (data: UserData) => Promise<{ success: boolean; message: string }>;
  loggedInData: { username: string };
  clearLoginData: () => void;
  isLoggedIn: boolean;
}

export const useAuthStore: UseBoundStore<StoreApi<UserAuthStore>> = create(
  persist(
    (set) => ({
      loggedInData: { username: "" },
      isLoggedIn: false,
      login: async ({ username, password }: UserData) => {
        toaster.create({
          title: "Logging in...",
          description: "Please wait...",
          type: "loading",
        });
        const res = await axios.post("/api/auth/login", {
          username,
          password,
        });
        toaster.dismiss();
        if (res.data.status) {
          set({ isLoggedIn: true, loggedInData: { username } });
          return { success: res.data.status, message: "Login successful" };
        } else {
          return { success: false, message: "Login error" };
        }
      },

      register: async ({ username, password }: UserData) => {
        toaster.create({
          title: "Registering...",
          description: "Please wait...",
          type: "loading",
        });
        const res = await axios.post("/api/auth/register", {
          username,
          password,
        });
        toaster.dismiss();
        if (res.data.status) {
          return {
            success: res.data.status,
            message: "Registraion successful",
          };
        } else {
          return { success: false, message: "Registration error" };
        }
      },
      clearLoginData: () =>
        set({ loggedInData: { username: "" }, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        loggedInData: {
          username: state.loggedInData.username,
        },
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
