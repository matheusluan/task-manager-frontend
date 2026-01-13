"use client";

import { useEffect } from "react";
import { IUser } from "@/lib/interfaces/user";
import { userStore } from "@/lib/stores/user.store";
import Header from "./header";

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
        <div className="flex items-center justify-center min-h-dvh">
            <div className="relative max-w-250 w-full rounded-lg min-h-dvh md:min-h-[80dvh] overflow-hidden bg-white">

                <Header />

                <main className="px-6">
                    {children}
                </main>

            </div>
        </div>
    );
}
