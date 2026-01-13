"use client";

import { userStore } from "@/lib/stores/user.store";

export default function Header() {

    const { user } = userStore();
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
            </div>
        </header>
    );
}
