"use client";

import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { userStore } from "@/lib/stores/user.store";

export default function Header() {
    const router = useRouter();
    const { user, clearUser } = userStore();

    async function handleLogout() {
        try {
            await api.post("auth/logout")
            clearUser();
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header
            className="
                sticky top-0 z-50 
                flex items-center justify-between
                px-6 py-4
                backdrop-blur-md bg-background/70
                border-b border-border/40
            "
        >
            <div className="font-semibold text-lg">
                Task Manager
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                    {user?.name}
                </span>

                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                    {user?.name?.[0]?.toUpperCase()}
                </div>

                <Button onClick={handleLogout} variant="ghost" className="h-9 w-9 rounded-full flex items-center justify-center font-semibold cursor-pointer">
                    <LogOutIcon />
                </Button>
            </div>
        </header>
    );
}
