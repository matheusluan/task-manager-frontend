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
        <div className="flex items-center justify-center min-h-dvh ">
            <div className="flex gap-2 min-h-dvh md:min-h-[80dvh] ">
                {/* Left bar on Desktop and float bar on mobile */}
                <Menu />

                <div className="relative max-w-300 min-w-screen md:min-w-[60vw] w-full rounded-lg min-h-dvh md:min-h-[80dvh] overflow-hidden bg-white pb-20">

                    <Header />

                    <main className="px-6">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
}
