"use client";

import { useEffect } from "react";
import { IUser } from "@/lib/interfaces/user";
import { userStore } from "@/lib/stores/user.store";
import Header from "./header";
import { Menu } from "./menu";

export default function ClientProvider({
    user,
    children,
}: {
    user: IUser;
    children: React.ReactNode;
}) {
    const { setUser } = userStore();

    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    return (
        <div className="min-h-dvh bg-slate-100 flex md:items-center md:justify-center">
            <div className="flex w-full h-dvh md:h-[80dvh] md:max-w-7xl md:gap-4 md:p-2">

                {/* Menu */}
                <Menu />

                {/* Main container */}
                <div className="relative flex-1 w-full h-dvh md:h-full bg-white md:rounded-xl md:shadow-lg overflow-y-auto overflow-x-hidden pb-20">

                    <Header />

                    <main className="px-4 md:px-6 pt-4">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
}
