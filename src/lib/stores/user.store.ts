import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/lib/interfaces/user";

interface UserState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const userStore = create(
    persist<UserState>(
        (set) => ({
            user: null,

            setUser: (user: IUser) => set({ user }),

            clearUser: () => {
                localStorage.removeItem("token");
                set({ user: null });
            },
        }),
        {
            name: "user-storage",
        }
    )
);
