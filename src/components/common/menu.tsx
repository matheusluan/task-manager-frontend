'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { userStore } from '@/lib/stores/user.store';
import { Home, User, ListCheck, LogOutIcon } from 'lucide-react';
import { api } from '@/lib/api';

export function Menu() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, clearUser } = userStore();

    const isActive = (path: string) => pathname === path;

    const itemClass = (path: string) =>
        isActive(path)
            ? 'bg-indigo-600 text-white cursor-pointer'
            : 'text-slate-300 cursor-pointer';

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
        <>
            {/* Mobile bottom bar */}
            <section className="fixed bottom-4 left-0 right-0 z-50 mx-auto flex w-[80vw] rounded-xl md:hidden bg-slate-900 shadow-lg">
                <nav className="flex w-full justify-around py-2">

                    <div className="mb-4 h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                        {user?.name?.[0]?.toUpperCase()}
                    </div>


                    <Link href="/user">
                        <Button size="icon" variant="ghost" className={itemClass('/user')}>
                            <Home className="size-5" />
                        </Button>
                    </Link>

                    <Link href="/profile">
                        <Button size="icon" variant="ghost" className={itemClass('/profile')}>
                            <User className="size-5" />
                        </Button>
                    </Link>

                    <Link href="/tasks">
                        <Button size="icon" variant="ghost" className={itemClass('/tasks')}>
                            <ListCheck className="size-5" />
                        </Button>
                    </Link>

                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="text-red-400 hover:bg-red-500/10"
                    >
                        <LogOutIcon className="size-5" />
                    </Button>
                </nav>
            </section>

            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-16 bg-slate-900 text-white flex-col rounded-xl shadow-md">
                <nav className="flex-1 p-3 flex flex-col gap-2">
                    <div className="h-9 w-9 rounded-full mb-4 bg-white flex items-center text-black justify-center font-semibold">
                        {user?.name?.[0]?.toUpperCase()}
                    </div>

                    <Link href="/user">
                        <Button size="icon" variant="ghost" className={itemClass('/user')}>
                            <Home className="size-5" />
                        </Button>
                    </Link>

                    <Link href="/profile">
                        <Button size="icon" variant="ghost" className={itemClass('/profile')}>
                            <User className="size-5" />
                        </Button>
                    </Link>

                    <Link href="/tasks">
                        <Button size="icon" variant="ghost" className={itemClass('/tasks')}>
                            <ListCheck className="size-5" />
                        </Button>
                    </Link>

                    <div className="flex-1" />

                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="text-red-400 "
                    >
                        <LogOutIcon className="size-5" />
                    </Button>
                </nav>
            </aside>
        </>
    );
}
